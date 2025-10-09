const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "Putkivaippaa",
    "author": "Jänis",
    "url": "https://example.com/testiblogi",
    "likes": 25,
  },
  {
    "title": "Putkivaippaa",
    "author": "Jänis",
    "url": "https://example.com/testiblogi",
    "likes": 25
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}