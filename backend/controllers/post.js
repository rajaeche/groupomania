const postModel = require('../models/post')
const PostModel = require('../models/post')
const UserModel = require('../models/user')
const { uploadErrors } = require('../utils/errors')
const ObjectID = require('mongoose').Types.ObjectId
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)

// posts
module.exports.readPost = (req, res) => {
    // eslint-disable-next-line array-callback-return
    PostModel.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error to get data : ' + err)
    }).sort({ createdAt: -1 })
}

// new post
module.exports.createPost = async (req, res) => {
    let fileName
    if (req.file !== null) {
        try {
            if (
                req.file.detectedMimeType !== 'image/jpg' &&
                req.file.detectedMimeType !== 'image/png' &&
                req.file.detectedMimeType !== 'image/jpeg'
            )
                throw Error('invalid file')

            if (req.file.size > 500000) throw Error('max size')
        } catch (err) {
            const errors = uploadErrors(err)
            return res.status(201).json({ errors })
        }
        fileName = req.body.posterId + Date.now() + '.jpg'

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../../public/uploads/posts/${fileName}`
            )
        )
    }

    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? './uploads/posts/' + fileName : '',
        video: req.body.video,
        likers: [],
        comments: [],
    })

    try {
        const post = await newPost.save()
        return res.status(201).json(post)
    } catch (err) {
        return res.status(400).send(err)
    }
}

// edit post with admin access
module.exports.updatePost = async (req, res) => {
    try {
        const updatedRecord = {
            message: req.body.message,
        }
        const post = await PostModel.findById(req.params.id)
        const user = await UserModel.findOne({ _id: post.posterId })

        if (post.posterId === user.id || user.admin === true) {
            await post.updateOne(
                { $set: updatedRecord },
                { new: true },
                (err, docs) => {
                    if (!err) res.send(docs)
                    else console.log('Update error : ' + err)
                }
            )
        } else {
            res.status(403).json('access denied')
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

// delete post with admin access
// module.exports.deletePost = async (req, res) => {
//     try {
//         const post = await PostModel.findById(req.params.id)
//         const user = await UserModel.findOne(req.body)

//         if (post.posterId === user.id || user.admin === true) {
//             await post.deleteOne()
//             res.status(200).json('Post has been deleted')
//         } else {
//             res.status(403).json('You can only delete your posts')
//         }
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    const post = PostModel.findById(req.params.id)
    const user = UserModel.findOne(req.body)

    PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err && (post.posterId === user.id || user.admin === true))
            res.send(docs)
        else console.log('Delete error : ' + err)
    })
}

// like post
module.exports.likePost = (req, res) => {
    PostModel.findOne({
        _id: req.params.id,
    })
        .then((post) => {
            if (!post.likers.includes(req.body.id)) {
                PostModel.updateOne(
                    { _id: req.params.id },
                    { $push: { likers: req.body.id } },
                    { new: true }
                )
                    .then(() => {
                        res.status(201).json({ message: 'post liked' })
                    })
                    .catch((err) => res.status(500).send({ err }))
            }
        })
        .catch((err) => {
            return res.status(400).json({ err })
        })

    UserModel.findOne({
        _id: req.body.id,
    }).then((user) => {
        if (!user.likes.includes(req.params)) {
            UserModel.updateOne(
                { _id: req.body.id },
                { $push: { likes: req.params } },
                { new: true }
            )
        }

        if (user.likes.includes(req.params)) {
            UserModel.updateOne(
                { _id: req.body.id },
                { $pull: { likes: req.params } },
                { new: true }
            )
        }
    })
}

// unlike post
module.exports.unlikePost = async (req, res) => {
    PostModel.findOne({
        _id: req.params.id,
    })
        .then((post) => {
            if (post.likers.includes(req.body.id)) {
                PostModel.updateOne(
                    { _id: req.params.id },
                    { $pull: { likers: req.body.id } },
                    { new: true }
                )
                    .then(() => {
                        res.status(201).json({ message: 'post unliked' })
                    })
                    .catch((err) => res.status(500).send({ err }))
            }
        })
        .catch((err) => {
            return res.status(400).json({ err })
        })

    UserModel.findOne({
        _id: req.body.id,
    }).then((user) => {
        if (user.likes.includes(req.params)) {
            UserModel.updateOne(
                { _id: req.body.id },
                { $pull: { likes: req.params } },
                { new: true }
            )
        }
    })
}

// comments
module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true }
        )
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }))
    } catch (err) {
        return res.status(400).send(err)
    }
}

// edit comment by user
module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        return PostModel.findById(req.params.id, (err, docs) => {
            const theComment = docs.comments.find((comment) =>
                comment._id.equals(req.body.commentId)
            )

            if (!theComment) return res.status(404).send('Comment not found')
            theComment.text = req.body.text

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs)
                return res.status(500).send(err)
            })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

// delete comment by user
module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true }
        )
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }))
    } catch (err) {
        return res.status(400).send(err)
    }
}
