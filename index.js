const express = require('express');
const userRouter = require('./users/users-router')
const session = require('express-session');
const server = express()


const sessionConfig =  
  session({
    name: "firstSession",
    secret: "this is going to be fun",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
  })

server.use(express.json())


server.use(sessionConfig)
server.use('/api', userRouter)


const port = 1337

server.listen(port, () => {
  console.log(`we are on port ${port}`)
})


