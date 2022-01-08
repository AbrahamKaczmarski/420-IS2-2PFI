// -- dependencies
const { json } = require('express')
const express = require('express')
const db = require('./db/db')

// -- local imports
const api = require('./routes/api')

// -- config
require('dotenv').config()
const HOSTNAME = process.env.HOSTNAME ?? 'localhost'
const PORT = process.env.PORT ?? 3000
const app = express()

// -- middleware
app.use(json())

// -- routes
app.use('/api', api)

// -- start
app.listen(PORT, HOSTNAME, () => {
  console.log(`Listening at http://${HOSTNAME}:${PORT}`)
})