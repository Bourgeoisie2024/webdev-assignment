const mysql = require("mysql2");
require("dotenv").config();

console.log(process.env.DB_HOST);

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Nimalamysql2024",
  database: "node_crud",
});

module.exports = pool.promise();
