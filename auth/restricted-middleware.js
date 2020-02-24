const bcrypt = require('bcryptjs')
const usersModel = require('../users/users-model')

module.exports = function restricted(req, res, next) {
  if(req.session && req.session.user) {
    console.log(req.session)
    console.log(req.session.user)
    next()
  } else {
    res.status(401).json({message: 'sorry you can not pass' })
  }

}