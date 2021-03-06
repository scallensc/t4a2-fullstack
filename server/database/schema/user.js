import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    providerId: String,
    provider: String,
    role: String
})

const UserModel = model('User', UserSchema)

export { UserModel }
