// api routes specifically for login

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// user submits/clicks login button
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // find user from db
  const user = await User.findOne({ username })

  // if user null (ie. DNE), then !passwordCorrect
  // else compare the password submitted since user is found in db
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  // user not found & password wrong
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // for future authen + expiration time of 1hr (60 sec x 60)
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter