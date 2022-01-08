import mysql from 'mysql'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zaq1@WSX',
  database: 'acdb'
})

export const query = q => {
  connection.connect()
  connection.query(q, (err, rows, fields) => {
    if (err) throw err
    console.log(rows)
  })
  connection.end()
}
