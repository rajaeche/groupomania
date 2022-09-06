const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null
                    // res.cookie('jwt', '', { maxAge: 1 })
                    next()
                } else {
                    const user = UserModel.findById(decodedToken.id)
                    res.locals.user = user
                    next()
                }
            }
        )
    } else {
        res.locals.user = null
        next()
    }
}

// locals: info de user qui transitent. si il n'y a pas de token les locals ne sont pas transmises

module.exports.requireAuth = (req, res, next) => {
    const userAdmin = UserModel.findOne({ admin: true })
    console.log('userAdmin', userAdmin)
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            async (err, decodedToken) => {
                console.log('decoded token', decodedToken)
                if (err) {
                    res.send(200).json('no token')
                } else {
                    res.status(200).json(decodedToken.id)
                    next()
                }
            }
        )
    } else {
        console.log('no token')
    }
}
