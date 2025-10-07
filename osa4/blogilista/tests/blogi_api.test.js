const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const testBlogs = [
  {
    "_id": "68e4bdae1cac2b90a74b7977",
    "title": "Putkivaippaa",
    "author": "Jänis",
    "url": "https://example.com/testiblogi",
    "likes": 25,
    "__v": 0
  },
  {
    "_id": "68e4c07137565cadd298d308",
    "title": "Putkivaippaa",
    "author": "Jänis",
    "url": "https://example.com/testiblogi",
    "likes": 25,
    "__v": 0
  }
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(testBlogs[0])
  await blogObject.save()
  blogObject = new Blog(testBlogs[1])
  await blogObject.save()
})

test('all blogs are returned', async () => {
  const blogs = await api.get('/api/blogs')

  assert.strictEqual(blogs.body.length, testBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('property should be called named id', async () => {
  const blogs = await api.get('/api/blogs')
  blogs.body.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

after(async () => {
  await mongoose.connection.close()
})