import mysql from 'mysql'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zaq1@WSX',
  database: 'acdb'
})

export const query = q => {
  console.log(q);
  return new Promise((res,rej)=>{
    connection.query(q, (err, rows, fields) => {
      if (err) rej(err)
      res(rows)
    })
  })
}
