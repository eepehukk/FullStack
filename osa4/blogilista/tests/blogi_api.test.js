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

test('blog without content is not added', async () => {
  const newBlog = {
    important: true
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