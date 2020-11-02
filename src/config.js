const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

<<<<<<< HEAD
const connection = mysql.createPool({
=======
const connection = mysql.createConnection({
>>>>>>> dev
  host: process.env.HEROKU_HOST,
  user: process.env.HEROKU_USER,
  password: process.env.HEROKU_PASSWORD,
  database: process.env.HEROKU_DATABASE,
  insecureAuth: true,
});
module.exports = connection;
