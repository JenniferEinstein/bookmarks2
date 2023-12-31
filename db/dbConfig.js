const pgp = require("pg-promise")();
require("dotenv").config();

const cn = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
};

// cn is short for connection

const db = pgp(cn);

module.exports = db;

// the "cn" object is another settings object. We can find the actual answers in the .env file