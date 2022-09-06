const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
require('./config/db')
require('dotenv').config({ path: './config/.env' })
const { checkUser, requireAuth } = require('./middleware/auth')

const cors = require('cors')

const app = express()

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// jwt=> toutes les routes sont controllés par une auth jwt
app.get('*', checkUser)
app.get('/jwtid', requireAuth)
// app.get('/jwtid', requireAuth, (req, res) => {
//     res.status(200).json(res)
// })

// routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
