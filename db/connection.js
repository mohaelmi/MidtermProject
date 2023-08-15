// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: 'localhost',
  port: 5432,
  user: 'labber',
  password: 'labber',
  database: 'midterm'
};
console.log(dbParams);
const db = new Pool(dbParams);

db.connect();

module.exports = db;
