import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    id: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const UserInfo = mongoose.model('User', userSchema)

export default UserInfo;