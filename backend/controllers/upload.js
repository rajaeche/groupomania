const UserModel = require('../models/User')
const fs = require('fs')
const util = require('util')
const stream = require('stream')
const pipeline = util.promisify(stream.pipeline)
const { uploadErrors } = require('../utils/errors')

module.exports.uploadProfil = async (req, res) => {
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

    const fileName = req.body.name + '.jpg'

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../../public/uploads/profil/${fileName}`
        )
    )

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: './uploads/profil/' + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }))
    } catch (err) {
        console.log('err', err)
        return res.status(500).send({ message: err })
    }
}
