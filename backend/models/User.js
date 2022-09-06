const mongoose = require('mongoose')
// package validation email
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            trimp: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail],
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        picture: {
            type: String,
        },
        bio: {
            type: String,
            max: 1024,
        },
        // followers: {
        //     type: [String],
        // },
        // following: {
        //     type: [String],
        // },
        likes: {
            type: [String],
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.statics.login = async function (email, password, admin) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        } else {
            throw Error('invalid password')
        }
    } else {
        throw Error('invalid email')
    }
}

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
