require('dotenv').config(); // Load environment variables from .env file

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD, // Use the environment variable for the password
  host: "localhost",
  port: "5432",
  database: "tododb"
});

module.exports = pool;
