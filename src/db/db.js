const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zaq1@WSX",
  database: "acdb",
});

const query = (q) =>{
connection.connect();
connection.query(q,(err,rows,fields)=>{
  if(err)throw err
  console.log(rows);
})
connection.end();
}

// connection.connect();

// connection.query("SELECT 1 + 1 AS solution", function (err, rows, fields) {
//   if (err) throw err;

//   console.log("The solution is: ", rows[0].solution);
// });

// connection.end();

module.exports = {query}