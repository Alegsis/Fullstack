const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    } else {
        req.token = null
    }
    next()
}

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, config.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    req.user = await User.findById(decodedToken.id)
    next()
}

module.exports = {tokenExtractor, userExtractor}