
//0// Connecting to db
const db = require('../connection');


//1// Getting All users :
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// testing
//getUsers()
//  .then(users => {
//    console.log('Users:', users);
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });
//


//2// Getting a user by its id :
const getUserById = (userId) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [userId])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};
//testing
//getUserById(3)
//  .then(user => {
//    console.log('Users:', user);
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });

//
module.exports = { getUsers, getUserById  };

