//0// Connecting to db
const db = require("../connection");

//1// Getting All users :
const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

//2// Getting a user by its id :
const getUserById = (userId) => {
  return db
    .query("SELECT * FROM users WHERE id = $1;", [userId])
    .then((data) => {
      return data.rows[0];
    })
    .catch((error) => {
      throw error;
    });
};

const addNewUser = (user) => {
  db.query(
    `INSERT INTO users (name, email) 
  VALUES ($1, $2) RETURNING *;`,
    [user.name, user.email]
  ).then((result) => {
    return result.rows[0];
  });
};

module.exports = { getUsers, getUserById, addNewUser };
