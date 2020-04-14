import express from 'express'
import { to } from 'await-to-js'
import { verifyPassword, hashPassword, getRedirectUrl } from '../auth/utils'
import { login } from '../auth/strategies/jwt'
import { createUser, getUserByEmail } from '../database/user'

const router = express.Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const [err, user] = await to(getUserByEmail(email))

    const authenticationError = () => {
        return res.status(500).json({ success: false, data: 'Authentication error!' })
    }

    if (!(await verifyPassword(password, user.password))) {
        console.log('Error: Passwords do not match')
        console.error('Passwords do not match')
        return authenticationError()
    }

    const [loginErr, token] = await to(login(req, user))

    if (loginErr) {
        console.log('Error: Log in error', loginErr)
        console.error('Log in error', loginErr)
        return authenticationError()
    }

    console.log('Success: Logged in')
    return res
        .status(200)
        .cookie('jwt', token, {
            httpOnly: true
        })
        .json({
            success: true,
            data: getRedirectUrl(user.role)
        })
})

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
        console.log('Error: Invalid email address')
        return res.status(500).json({ success: false, data: 'Enter a valid email address.' })
    } else if (password.length < 5 || password.length > 20) {
        console.log('Error: Password length invalid')
        return res.status(500).json({
            success: false,
            data: 'Password must be between 5 and 20 characters.'
        })
    }

    let [err, user] = await to(
        createUser({
            firstName,
            lastName,
            email,
            password: await hashPassword(password)
        })
    )

    if (err) {
        console.log('Error: Email in use')
        return res.status(500).json({ success: false, data: 'Email is already taken' })
    }

    const [loginErr, token] = await to(login(req, user))

    if (loginErr) {
        console.error(loginErr)
        console.log('Error: Authentication error!', loginErr)
        return res.status(500).json({ success: false, data: 'Authentication error!' })
    }

    if (!err && !loginErr) {
        console.log('Success: Registered and logged in')
        return res
            .status(200)
            .cookie('jwt', token, {
                httpOnly: true
            })
            .json({
                success: true,
                data: getRedirectUrl(user.role)
            })
    }
})

export default router