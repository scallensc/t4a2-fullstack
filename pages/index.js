import React from 'react'
import Head from 'next/head'

const Home = () => (
    <div>
        <Head>
            <title>Home</title>
            <link rel="icon" href="/static/favicon.ico" importance="low" />
        </Head>

        <div className="hero">
            <h1 className="title">Forum project</h1>
            <div className="row">
                <a href="/register">Go to registration page</a>
            </div>
            <div className="row">
                <a href="/login">Go to login page</a>
            </div>
        </div>
    </div>
)

export default Home
