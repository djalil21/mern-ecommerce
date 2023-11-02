require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        if (authHeader) {
            const token = authHeader && authHeader.split(' ')[1]
            const data = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = data
            next()
        } else {
            return res.status(401).json("You are not authenticated!");
        }
    } catch (error) {
        return res.status(500).json("Wrong password!");

    }
}

module.exports.isAuthorized = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next()
    } else {
        res.status(403).json("you're not authorized")
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next()
    } else {
        res.status(403).json("you're not authorized")
    }
}