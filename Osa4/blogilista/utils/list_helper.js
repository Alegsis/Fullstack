const _ = require('lodash');
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((summary, order) => {
        return summary + order.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const likedMost = blogs.reduce((previous, current) => {
        return (previous.likes >= current.likes)
            ? previous
            : current
    }, 0)

    return {
        title: likedMost.title,
        author: likedMost.author,
        likes: likedMost.likes
    }
}

const mostBlogs = (blogs) => {
    return {
        author: _.maxBy(blogs, "author").author,
        blogs: _.max(_.values(_.countBy(blogs, "author"))),
    }
}

const mostLikes = (blogs) => {
    const authorLikes = blogs.reduce((overall, { author, likes }) => {
        overall[author] = overall[author] || 0
        overall[author] += likes
        return overall
    }, {})

    const likedMost = Object.keys(authorLikes).sort((previous, current) => authorLikes[current] - authorLikes[previous])[0]

    return {
        author: likedMost,
        likes: authorLikes[likedMost]
    }
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}