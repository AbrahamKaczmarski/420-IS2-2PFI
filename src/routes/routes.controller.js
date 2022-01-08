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

export const welcome = (req, res) => {
  res.send('Welcome to api')
}

export const writeText = (req, res) => {
  return res.send(`text: ${req.params.text}`)
}

export const addBlog = (req, res) => {
  blog.push(req.body)
  return res.status(201).send('Post added')
}

export const showBlog = (req, res) => {
  return res.send(blog)
}

// # == Private
