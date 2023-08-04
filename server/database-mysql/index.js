const mysql = require('mysql2');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'analyse'
});
connection.connect((err)=>{
  err ? console.log(err) : console.log("connected");
 })
module.exports = connection;