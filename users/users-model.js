const data = require('../data/dbCongfig')


function getUser() {
  return data('users')
  .select('users.username')
  
}

function registerUser(userData) {
  return data('users')
   .insert(userData)
}

function logIn(userName) {
  return data('users')
  .where(userName)
}

module.exports = {
 getUser,
 registerUser,
  logIn
}