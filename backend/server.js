const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
require('dotenv').config({ path: './config/.env' })
const { checkUser, requireAuth } = require('./middleware/auth')

const mongoose = require('mongoose')

const uri = `mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@ac-cztgqs9-shard-00-00.wehshrb.mongodb.net:27017,ac-cztgqs9-shard-00-01.wehshrb.mongodb.net:27017,ac-cztgqs9-shard-00-02.wehshrb.mongodb.net:27017/?ssl=true&replicaSet=atlas-y7op3t-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connexion à mongoDB réussi!'))
    .catch((err) => console.log('Connexion à mongoDB échoué!', err))

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
