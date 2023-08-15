const db = require('../connection');

//1. Getting all items listed by a seller_id(admin)
const getAdminListingItems = (sellerId) => {
  return db.query('SELECT * FROM items WHERE seller_id = $1', [sellerId])
    .then((items) => {
      return items.rows;
    });
};

//// testing
//getAdminListingItems(1)
//.then(items => {
//  console.log('Admin list:', items);
//})
//.catch(error => {
//  console.error('Error:', error);
//});


//2. Editting an item's values posted by the seller_id(admin)

