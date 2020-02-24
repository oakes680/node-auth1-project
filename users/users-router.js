const express = require('express')
const usersModel = require('./users-model')
const restricted = require('../auth/restricted-middleware')

const bcrypt = require('bcryptjs')

const router = express()

router.use(express.json())




router.get('/users', restricted, (req, res) => {
  usersModel.getUser()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({message: 'error returning user'})
  })
})

router.post('/register', (req, res) => {
  const data = req.body
  const hash = bcrypt.hashSync(data.password, 12)
  data.password = hash 

  usersModel.registerUser(data)
    .then(thing => {
      res.status(200).json(thing)
    })
    .catch(err => {
      res.status(500).json({message: 'error registering new user'})
    })
})

router.post('/login', (req, res) => {
  const {username, password} = req.body
  
  usersModel.logIn({username})
  .first()
 .then(user => {
   if(user && bcrypt.compareSync(password, user.password)) {
    
    req.session.user = user
   res.status(200).json(`welcome back ${user.username}`)
  }  else {
     res.status(401).json({ message: 'credentials invalid' })
  }
 })
    .catch(err => {
      res.status(500).json({ message: 'server error' })
    })
})

router.get('/logout', (req, res) => {
     if(req.session.user) {
       console.log('dogggg', req.session)
       req.session.destroy(err => {
         console.log(err)
         if(err) {
           res.json({message: `you can't go`})
         } else {
           res.status(200).json({ message: `thanks come again` })
         }
       })
     } else {
       res.status(200).json({message: 'you are not logged in bro'})
     }
})



module.exports = router