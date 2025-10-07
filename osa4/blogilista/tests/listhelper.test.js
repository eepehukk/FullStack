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

describe('favouriteBlog', () => {
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
      {
        _id: '5a422aa71b54a676234d17f1',
        title: 'Eemil KANDIDAATIKSI',
        author: 'Ei kukaan',
        url: 'http://example.com/L',
        likes: 100,
        __v: 0,
      },
    ]
  
    test('The blog with the most likes', () => {
      const result = listHelper.favouriteBlog(listWithMultipleBlogs)
      assert.deepStrictEqual(result, {
        title: 'Juuso Aaltoon',
        author: 'Juuso',
        likes: 100
      })
    })
})

/*--------------mostBlogs----------------------- */

describe('mostBlogs', () => {
    const listWithMultipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
    ]
  
    test('The author with most blogs', () => {
      const result = listHelper.mostBlogs(listWithMultipleBlogs)
      assert.deepStrictEqual(result, {
        author: 'Robert C. Martin',
        blogs: 3
      })
    })
})

/*--------------mostLikes----------------------- */

describe('mostLikes', () => {
    const listWithMultipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
    ]
  
    test('The author with most likes', () => {
      const result = listHelper.mostLikes(listWithMultipleBlogs)
      assert.deepStrictEqual(result, {
        author: 'Edsger W. Dijkstra',
        likes: 17
      })
    })
})