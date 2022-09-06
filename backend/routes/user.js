const router = require('express').Router()
const authController = require('../controllers/auth')
const userController = require('../controllers/user')
const uploadController = require('../controllers/upload')
const multer = require('multer')
const upload = multer()

// auth
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// user
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getSingleUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

// upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil)

module.exports = router
