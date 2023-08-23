// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: 'localhost',
  port: 5432,
  user: 'labber',
  password: 'labber',
  database: 'midterm'
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
