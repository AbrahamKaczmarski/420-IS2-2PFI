import jwt from 'jsonwebtoken'
import users from '../db/users'
import { query } from '../db/db'
import contentType from '../utils/contentType'

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
  const format = contentType(req, 'gladiator', 'gladiators')

  if (!format) return res.status(406).end()

  query('SELECT * FROM glad')
    .then(list => res.send(format(list)))
    .catch(err => res.status(404).end())
}

export const gladiatorById = (req, res) => {
  const format = contentType(req, 'event', 'gladiator')

  if (!format) return res.status(406).end()

  query(
    `SELECT * FROM glad INNER JOIN fight AS w ON glad.id = w.winner INNER JOIN fight AS l ON glad.id = l.loser WHERE glad.id = ${req.params.id}`
  )
    .then(list => res.send(format(list)))
    .catch(err => {
      console.log(err)
      return res.status(404).end()
    })
}

export const fightByGladiatorAndId = (req, res) => {
  const format = contentType(req, 'fight')
  const n = req.params.fid - 1
  query(
    `SELECT * FROM glad INNER JOIN fight AS w ON glad.id = w.winner INNER JOIN fight AS l ON glad.id = l.loser WHERE glad.id = ${req.params.gid} LIMIT ${n}, 1`
  )
    .then(([result]) => {
      if (result) {
        return res.send(format(result))
      } else {
        res.status(404).end()
      }
    })
    .catch(() => res.status(404).end())
}

export const fights = (req, res) => {
  const format = contentType(req, 'fight', 'fights')

  if (!format) return res.status(406).end()

  const { lethal, date_from, date_to } = req.query
  const constrains = []
  lethal && constrains.push(`lethal = ${lethal}`)
  date_from && constrains.push(`date > '${date_from}'`)
  date_to && constrains.push(`date < '${date_to}'`)

  const where =
    constrains.length < 1 ? '' : ` WHERE ${constrains.join(' AND ')}`

  query(`SELECT * FROM fight${where}`)
    .then(list => res.send(format(list)))
    .catch(err => res.status(404).end())
}

// # == Private

export const addGladiator = (req, res) => {
  const { name, province, acquisition } = req.body
  query(
    `INSERT INTO glad (name,province,acquisition) VALUES ('${name}','${province}','${acquisition}')`
  )
    .then(() => res.status(201).end())
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
}
export const updateGladiator = (req, res) => {
  const { name, province, acquisition } = req.body
  query(`UPDATE glad SET name = '${name}',
                         province = '${province}',
                         acquisition = '${acquisition}'
                     WHERE id = '${req.params.id}' `)
    .then(() => res.status(200).end())
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
}
export const deleteGladiator = (req, res) => {
  //const {name,province,acquisition} = req.body
  query(`DELETE FROM glad WHERE id = '${req.params.id}' `)
    .then(() => res.status(200).end())
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
}
export const addFight = (req, res) => {
  const { date, winner, loser, lethal } = req.body
  query(
    `INSERT INTO fight (date,winner,loser,lethal) VALUES ('${date}','${winner}','${loser}',${lethal})`
  )
    .then(() => res.status(201).end())
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
}
export const updateFight = (req, res) => {
  const { date, winner, loser, lethal } = req.body
  query(
    `UPDATE fight SET date = '${date}', winner = '${winner}', loser = '${loser}', lethal = ${lethal} WHERE id = '${req.params.id}'`
  )
    .then(() => res.status(200).end())
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
}
export const deleteFight = (req, res) => {
  //const {date,winner,loser,lethal} = req.body
  query(`DELETE FROM fight WHERE id = '${req.params.id}'`)
    .then(() => res.status(200).end())
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
}
