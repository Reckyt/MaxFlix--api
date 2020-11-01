const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST_SERVER,
  user: process.env.DB_USER_SERVER,
  password: process.env.DB_PASSWORD_SERVER,
  database: process.env.DB_DATABASE_SERVER,
  insecureAuth: true,
});
module.exports = connection;
