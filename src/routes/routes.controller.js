import jwt from 'jsonwebtoken'
import users from '../db/users'

const blog = []

// # == Authentication

export const generateToken = (req, res) => {
  const { username, password } = req.body
  if (users[username] === password) {
    return res.json(jwt.sign(username, process.env.TOKEN_SECRET))
  }
  res.status(401).end('Invalid credentials')
}

// # == Public

export const gladiators = (req, res) => {
  query('SELECT * FROM glad')
  return res.send()
}

export const test = (req, res) => {
  const message = {
    title: 'This is an object',
    from: 'Abraham',
    to: ['Marek', 'Łukasz']
  }

  const requestedType = req.headers['accept']

  if (requestedType === 'application/json') {
    // send json
    return res.json(message)
  }
  if (requestedType === 'application/xml') {
    // send xml
    return res.send(o2x({ message: message }))
  }
  // send error
  res.status(501).send('not implemented')
  return res.send('format: undefined')
}

// # == Private
