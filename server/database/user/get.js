import { UserModel } from '../schema'

async function getUserById(id) {
    return await UserModel.findById(id).exec()
}

export { getUserById }