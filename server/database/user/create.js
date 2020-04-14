import { UserModel } from '../schema'

async function createUser({
    firstName,
    lastName,
    email,
    password,
    providerId,
    provider,
    role
}) {
    return new Promise(async (resolve, reject) => {
        const err = await UserModel.findOne({ email })

        if (err) {
            reject('Email is already in use')
            return err
        }

        resolve(
            await UserModel.create({
                providerId,
                provider,
                firstName,
                lastName,
                email,
                password,
                role
            })
        )
    })
}

export { createUser }
