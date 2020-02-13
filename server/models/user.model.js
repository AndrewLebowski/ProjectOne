import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        validate: {
            validator: function(value) {
                if(value.length < 2) {
                    this.invalidate('name', 'Name is too short!')
                }
                if(value.length > 20) {
                    this.invalidate('name', 'Name is too long!')
                }
            }
        }
    },
    email: {
        type: String,
        unique: [true, 'This email is alreay exists'],
        required: [true, 'Email is required!'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        validate: {
            validator: function(value) {
                if(value.length < 6) {
                    this.invalidate('password', 'Password is too short!')
                }
            }
        }
    }
})

export default mongoose.model('User', UserSchema)
