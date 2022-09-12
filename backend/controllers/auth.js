const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const { signUpErrors, signInErrors } = require('../utils/errors')

const maxAge = 3 * 24 * 60 * 60 * 1000

// token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
    })
}

// signup
module.exports.signup = async (req, res) => {
    const { pseudo, email, password } = req.body

    try {
        const user = await UserModel.create({ pseudo, email, password })
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = signUpErrors(err)
        res.status(200).send({ errors })
    }
}

// login
module.exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password)
        const token = createToken(user.id)
        res.cookie('jwt', token, { httpOnly: true, maxAge })
        res.status(200).json({ user: user.id })
        console.log('user logged by id', user.id)
    } catch (err) {
        const errors = signInErrors(err)
        res.status(200).json({ errors })
    }
}

// logout
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}
