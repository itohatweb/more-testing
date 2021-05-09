const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: 30449,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = connection;