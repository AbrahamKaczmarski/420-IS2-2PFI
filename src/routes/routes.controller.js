import jwt from 'jsonwebtoken'
import users from '../db/users'
import { query } from '../db/db'
import { request } from 'express'

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
    .then(list=>res.json(list))
    .catch(err=>res.status(404).end())
}

export const gladiatorById = (req, res) => {
  query(`SELECT * FROM glad INNER JOIN fight AS w ON glad.id = w.winner INNER JOIN fight AS l ON glad.id = l.loser WHERE glad.id = ${req.params.id}`)
  .then(list=>res.json(list))
  .catch(err=>{
    console.log(err);
    return res.status(404).end()
  })
}

export const fights = (req, res) => {
  const {lethal,date_from,date_to} = req.query
  const constrains = []
  lethal && constrains.push(`lethal = ${lethal}`)
  date_from && constrains.push(`date > '${date_from}'`)
  date_to && constrains.push(`date < '${date_to}'`)

  const where = constrains.length < 1 ? '' : ` WHERE ${constrains.join(' AND ')}`
  
  query(`SELECT * FROM fight${where}`)
  .then(list=>res.json(list))
  .catch(err=>res.status(404).end())
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

export const addGladiator = (req,res) => {
  const {name,province,acquisition} = req.body
  query(`INSERT INTO glad (name,province,acquisition) VALUES ('${name}','${province}','${acquisition}')`)
  .then(()=>res.status(200).end())
  .catch((err)=>{
    console.log(err);
    res.status(500).end()
  })
}
export const updateGladiator = (req,res) => {
  const {name,province,acquisition} = req.body
  query(`UPDATE glad SET name = '${name}',
                         province = '${province}',
                         acquisition = '${acquisition}'
                     WHERE id = '${req.params.id}' `)
  .then(()=>res.status(200).end())
  .catch((err)=>{
    console.log(err);
    res.status(500).end()
  })
}
export const deleteGladiator = (req,res) => {
  //const {name,province,acquisition} = req.body
  query(`DELETE FROM glad WHERE id = '${req.params.id}' `)
  .then(()=>res.status(200).end())
  .catch((err)=>{
    console.log(err);
    res.status(500).end()
  })
}
export const addFight = (req,res) => {
  const {date,winner,loser,lethal} = req.body
  query(`INSERT INTO fight (date,winner,loser,lethal) VALUES ('${date}','${winner}','${loser}',${lethal})`)
  .then(()=>res.status(200).end())
  .catch((err)=>{
    console.log(err);
    res.status(500).end()
  })
}
export const updateFight = (req,res) => {
    const {date,winner,loser,lethal} = req.body
    query(`UPDATE fight SET date = '${date}', winner = '${winner}', loser = '${loser}', lethal = ${lethal} WHERE id = '${req.params.id}'`)
    .then(()=>res.status(200).end())
    .catch((err)=>{
      console.log(err);
      res.status(500).end()
    })
}
export const deleteFight = (req,res) => {
  //const {date,winner,loser,lethal} = req.body
  query(`DELETE FROM fight WHERE id = '${req.params.id}'`)
  .then(()=>res.status(200).end())
  .catch((err)=>{
    console.log(err);
    res.status(500).end()
  })
}
