
//1// Connecting to db
const db = require('../connection');


//2// Getting a user wishlist:

const getUserWishlist = (userId) => {
  return db.query(`
      SELECT * FROM items 
      WHERE id IN 
        (SELECT item_id FROM wishlisted_items
        WHERE wishlist_id IN 
          (SELECT id FROM wishlist 
          WHERE user_id = $1))
              `, [userId])
    .then(res => {
      return res.rows;
    });
};

//testing
getUserWishlist(3)
  .then(users => {
    console.log('Users:', users);
  })
  .catch(error => {
    console.error('Error:', error);
  });
//
// Add an item to a user's wishlist
const addToWishlist = (user_id, item_id) => {
  // ... (your code here)
};


module.exports = { getUserWishlist };
