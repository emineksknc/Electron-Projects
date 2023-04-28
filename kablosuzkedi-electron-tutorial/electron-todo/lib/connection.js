const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"Elephant17.",
    database:"todo"

})

connection.connect();


module.exports= {
    db: connection
}