import { UserModel } from './server/database/schema'
import mongoose from 'mongoose'
import { connect, connection } from 'mongoose'

const { Types } = mongoose

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

UserModel.find({}).exec((err, users) => {
    users.forEach(u => console.log(u))
})

// UserModel.updateOne({ _id: "<YOUR USER ID>" }, { role: "Admin" }).exec()

