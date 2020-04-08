import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = 3000

nextApp.prepare().then(() => {
    const app = express()

    app.get('/api', (req, res) =>
        res.status(200).json({ hello: 'Express API backend 200 OK' })
    ),

    app.get('*', (req, res) => {
        return handle(req, res)
    }),

    app.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on localhost:${port}`)
    })
})