const UserModel = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password')
    res.status(200).json(users)
}

module.exports.getSingleUser = (req, res) => {
    console.log(req.params)
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json('id unknown :' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.json(docs)
        else console.log('id unknown', err)
    }).select('-password')
}

module.exports.updateUser = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json('id unknown :' + req.params.id)

    try {
        UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.json(docs)
                if (err) return res.status(500).json({ message: err })
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err })
    }
    // } else {
    //     UserModel(
    //         {
    //             $set: {
    //                 bio: req.body.bio,
    //             },
    //         },
    //         { new: true, upsert: true, setDefaultsOnInsert: true },
    //         (err, docs) => {
    //             if (!err) return res.json(docs)
    //             if (err) return res.status(500).json({ message: err })
    //         }
    //     )
    // }
}

module.exports.deleteUser = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json('id unknown :' + req.params.id)
    try {
        UserModel.remove({ _id: req.params.id }).exec()
        res.status(200).json({ message: 'Successufully deleted' })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}
