const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

/*--------------DUMMY----------------------- */
test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

/*--------------Total Likes----------------------- */

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithZeroBlogs = []

    const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'Juuso Aaltoon',
          author: 'Juuso',
          url: 'http://example.com/a',
          likes: 100,
          __v: 0,
        },
        {
          _id: '5a422b3a1b54a676234d17f0',
          title: 'piip positiiviset puolet',
          author: 'El Jefe',
          url: 'http://example.com/b',
          likes: 7,
          __v: 0,
        },
      ]
  
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(listWithZeroBlogs)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list has multiple blog posts equals the amount of likes', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        assert.strictEqual(result, 107)
    })
})

/*--------------Favourites----------------------- */

