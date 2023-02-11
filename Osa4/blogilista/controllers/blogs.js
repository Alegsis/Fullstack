const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {userExtractor} = require("../utils/middleware");

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})
blogsRouter.post('/', userExtractor, async (req, res) => {
    const body = req.body
    const user = req.user
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
        likes: body.likes
    })
    if((!blog.title) && (!blog.url)) {
        res.status(400).json({ error: 'title and url missing' })
    }
    else{
        const blogSaved = await blog.save()
        user.blogs = user.blogs.concat(blogSaved._id)
        await user.save()
        res.status(201).json(blogSaved)
    }
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
    const user = req.user
    const blog = await Blog.findById(req.params.id)

    if (user.id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } else {
        res.status(401).json({ error: 'invalid user' })
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body
    const blog = {
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog)
})

module.exports = blogsRouter