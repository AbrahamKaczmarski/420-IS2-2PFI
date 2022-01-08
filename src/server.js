// -- dependencies
import express, { json } from 'express'
import dotenv from 'dotenv'

// -- local imports
import routes from './routes/routes'

// -- config
dotenv.config()
const HOSTNAME = process.env.HOSTNAME ?? 'localhost'
const PORT = process.env.PORT ?? 3000
const app = express()

// -- middleware
app.use(json())

// -- routes
app.use('/', routes)

// -- start
app.listen(PORT, HOSTNAME, () => {
  console.log(`Listening at http://${HOSTNAME}:${PORT}`)
})

