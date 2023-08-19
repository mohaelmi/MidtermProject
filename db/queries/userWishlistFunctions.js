
//0// Connecting to db
const db = require('../connection');


//1// Getting a user wishlist:

const getUserWishlist = (userId) => {
  return db.query(`
      SELECT id FROM items
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
//getUserWishlist(3)
//.then(wishlist => {
//  console.log('wishlist:', wishlist);
//})
//.catch(error => {
//  console.error('Error:', error);
//});
//


//2// Adding an item to user wishlist
const addToWishlist = (userId, itemId) => {
  let wishlist_id;
  return db.query(`
    INSERT INTO wishlist (user_id)
    VALUES ($1) RETURNING id;
    `,[userId])
  .then(res => {
    wishlist_id = res.rows[0].id;
    return db.query(`
    INSERT INTO wishlisted_items (wishlist_id, item_id)
    VALUES ($1,$2) RETURNING id;`
    ,[wishlist_id, itemId])
    .then(res => {
      return res.rows[0];
    })
  });
};
//testing
//addToWishlist(3, 12)
//  .then(() => {
//    getUserWishlist(3)
//      .then((wishlist) => {
//        console.log('wishlist:', wishlist);
//      })
//      .catch(error => {
//        console.error('Error:', error);
//      });
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });



//3// removing an item from  wishlist
const removeFromWishlist = (userId, itemId) => {
  return db.query(`
      DELETE FROM wishlisted_items
      WHERE wishlist_id IN (
      SELECT id FROM wishlist
      WHERE user_id = $1) AND item_id = $2
      `, [userId, itemId])
    .then(() => {
      console.log('Item removed from wishlist');
    });
};

//testing
//removeFromWishlist(3, 10)
//  .then(() => {
//    getUserWishlist(3)
//      .then(users => {
//        console.log('Users:', users);
//      })
//      .catch(error => {
//        console.error('Error:', error);
//      });
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });

module.exports = { getUserWishlist,addToWishlist, removeFromWishlist };
