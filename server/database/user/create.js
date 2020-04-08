import { UserModel } from '../schema'

// craete user function, adding provider info to possibly add oauth eg. facebook/google later
async function createUser({
    firstName,
    lastName,
    email,
    password,
    providerId,
    provider
}) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findOne({ email })

        if (user) {
            return reject('Email is already in use')
        }

        return resolve(
            await UserModel.create({
                providerId,
                provider,
                firstName,
                lastName,
                email,
                password
            })
        )
    })
}

export { createUser }