require('dotenv').config()

import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express'
import next from 'next'
import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import router from './router'
import { connectToDatabase } from './database/connection'
import { initialiseAuthentication, utils } from './auth'
import { ROLES } from '../utils'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
var cors = require('cors')

const port = (process.env.PORT || 3000)

nextApp.prepare().then(async () => {
    const app = express()

    app.use(urlencoded({ extended: true }))
    app.use(json())
    app.use(cookieParser())

    app.use(passport.initialize())

    router(app)
    initialiseAuthentication(app)

    app.use(cors())
    
    app.get('*', function (req, res, next) {
        if (req.headers['x-forwarded-proto'] != 'https')
            res.redirect('https://mypreferreddomain.com' + req.url)
        else
            next() /* Continue to other routes if we're not redirecting */
    })

    app.get(
        '/admin-dashboard',
        passport.authenticate('jwt', { failureRedirect: '/login' }),
        utils.checkIsInRole(ROLES.Admin),
        (req, res) => {
            console.log(handle(req, res))
            return handle(req.body, res)
        }
    )

    app.get(
        '/customer-dashboard',
        passport.authenticate('jwt', { failureRedirect: '/login' }),
        utils.checkIsInRole(ROLES.Customer),
        (req, res) => {
            console.log(req.body, res)
            return handle(req, res)
        }
    )

    app.get('*', (req, res) => {
        console.log(req.body, res)
        return handle(req, res)
    })

    await connectToDatabase()

    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app)
        .listen(3000, function () {
            console.log('Example app listening on port 3000! Go to https://localhost:3000/')
        })
})