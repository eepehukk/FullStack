const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + (blog.likes), 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const favourite = blogs.reduce((prev, current) => {
        if (current.likes > prev.likes) {
          return current
        }
        return prev
      })

    return {
        title: favourite.title,
        author: favourite.author,
        likes: favourite.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    // Alustetaan tyhjä muuttuja, jossa sijoitetaan kirjailijan blogimäärä
    const countByAuthor = {}
    
    // Lasketaan kirjailijan blogit
    blogs.forEach(blog => {
      if (countByAuthor[blog.author]) {
        countByAuthor[blog.author] += 1
      } else {
        countByAuthor[blog.author] = 1
      }
    })
  
    // Etsitään kirjoittaja jolla on eniten blogeja
    let maxBlogs = 0
    let maxAuthor = ''
  
    for (const author in countByAuthor) {
      if (countByAuthor[author] > maxBlogs) {
        maxBlogs = countByAuthor[author]
        maxAuthor = author
      }
    }
  
    return {
      author: maxAuthor,
      blogs: maxBlogs
    }
  }
  
  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    
    // Lasketaan kaikkien kirjoittajien tykkäykset yhteen
    const likesByAuthor = {}
  
    blogs.forEach(blog => {
      if (likesByAuthor[blog.author]) {
        likesByAuthor[blog.author] += blog.likes
      } else {
        likesByAuthor[blog.author] = blog.likes
      }
    })
  
    // Etsitään kirjoittaja, jolla eniten tykkäyksiä
    let maxLikes = 0
    let maxAuthor = ''
  
    for (const author in likesByAuthor) {
      if (likesByAuthor[author] > maxLikes) {
        maxLikes = likesByAuthor[author]
        maxAuthor = author
      }
    }
  
    return {
      author: maxAuthor,
      likes: maxLikes
    }
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }
  