const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body

    const usernameExisting = await User.findOne({username})

    if (usernameExisting) {
        res.status(400).json({error: 'username must be unique'})
    }
    else if (username.length < 3 || password.length < 3) {
        res.status(400).json({error: 'username and password must contain at least three characters'})
    }
    else{
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            name,
            passwordHash,
        })

        const userSaved = await user.save()

        res.status(201).json(userSaved)
    }
})

module.exports = usersRouter