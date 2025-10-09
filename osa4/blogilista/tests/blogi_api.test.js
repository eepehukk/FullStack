const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper') //ODOTA TÄMÄN KANSSA TEHDÄÄN HELPER
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const blogs = await api.get('/api/blogs')
  assert.strictEqual(blogs.body.length, helper.initialBlogs.length)  
})

test('property should be called named id', async () => {
  const blogs = await api.get('/api/blogs')
  blogs.body.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

// Testi, että voidaan postata
test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'El Jefe ei ole kipeä koskaan',
    author: 'Eemil',
    url: 'http://localhost:3003/api/blogs',
    likes: 58,
  }

  const blogsAtStart = await helper.blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('El Jefe ei ole kipeä koskaan'))
})

// Testataan, että blogissa on oltava title ja url
test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Anonymous',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})

// testi liket 0 automaattisesti
test('if likes value is empty then replace it with 0', async () => {
  const newBlog = {
    title: 'Blog with no likes field',
    author: 'eepehukk',
    url: 'miukumauku'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd.find(blog => blog.title === 'Blog with no likes field')

  assert.strictEqual(addedBlog.likes, 0)
})

// Blogin poiston testaaminen
test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const contents = blogsAtEnd.map(n => n.id)
  assert(!contents.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})