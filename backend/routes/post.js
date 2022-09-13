const router = require('express').Router()
const postController = require('../controllers/post')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer()
const upFile = upload.single('file')

// post
router.get('/', auth.checkUser, postController.readPost)
router.post('/', auth.checkUser, upFile, postController.createPost)
router.put('/:id', auth.checkUser, postController.updatePost)
router.delete('/:id', auth.checkUser, postController.deletePost)

// like
router.patch('/like-post/:id', auth.checkUser, postController.likePost)
router.patch('/unlike-post/:id', auth.checkUser, postController.unlikePost)

// commentaires
router.patch('/comment-post/:id', auth.checkUser, postController.commentPost)
router.patch(
    '/edit-comment-post/:id',
    auth.checkUser,
    postController.editCommentPost
)
router.patch(
    '/delete-comment-post/:id',
    auth.checkUser,
    postController.deleteCommentPost
)

module.exports = router
