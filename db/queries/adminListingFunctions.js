const db = require('../connection');

//1.// Getting all items listed by a seller_id(admin)
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


//2.//Adding(listing) a new item.

const addAdminListingItem = (sellerId, newItem) => {
    const { title, description, price, type, size, status, condition, city } = newItem;
  
    return db.query(`INSERT INTO items (seller_id, title, description, price, type, size, status, condition, city)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
                    [sellerId, title, description, price, type, size, status, condition, city])
      .then(result => {
        console.log('Item created successfully:', result.rows[0]);
        return result.rows[0];
      });
};
//testing
//const newItem = {
//    title: 'Mountain Bike',
//    description: 'A high-performance mountain bike for adventurous riders.',
//    price: 1200.00,
//    type: 'Sports Equipment',
//    size: 'L',
//    status: 'Available',
//    condition: 'Used',
//    city: 'Seattle'
//  };
//
//addAdminListingItem(3, newItem)
//  .then(() => {
//        getAdminListingItems(3)
//        .then((items) => {
//          console.log(items);
//        })
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });
//
//
//  
//

//3. Editting an item's values posted by the seller_id(admin)

const editAdminListingItem = (itemId, newItem) => {
  const { title, description, price, type, size, status, condition, city } = newItem;

  return db.query(`UPDATE items
                   SET title = $1, description = $2, price = $3, type = $4, size = $5, status = $6, condition = $7, city = $8
                   WHERE id = $9
                   RETURNING *`,
                   [title, description, price, type, size, status, condition, city, itemId])
    .then(result => {
      console.log('Item updated successfully:', result.rows[0]);
      return result.rows[0];
    });
};

//testing

//const newItemValues = {
//  title: 'Edited Bike',
//  description: 'A better description',
//  price: 1000.00,
//  type : 'hybrid',
//  size: 'M',
//  status: 'Available',
//  condition: 'Like New',
//  city: 'Testville'
//};
//
//editAdminListingItem(5, newItemValues)
//  .then(() => {
//    getAdminListingItems(5)
//      .then((items) => {
//          console.log(items);
//        })
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });

//4.// Changing the status of an item to SOLD! by the seller_id(admin)

const markedSoldByAdmin = (itemId) => {
    return db.query('UPDATE items SET status = $1 WHERE id = $2', ['SOLD', itemId])
      .then(() => {
        console.log('Item marked as SOLD!');
      });
}

//testing
//markedSoldByAdmin(4)
//  .then(() => {
//        getAdminListingItems(4)
//          .then((items) => {
//              console.log(items);
//            })
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });


//5.// Deleting an item posted by the seller_id(admin) and related wishlisted_items and photos

const deleteAdminListingItem = (itemId) => {
    return db.query('DELETE FROM wishlisted_items WHERE item_id = $1', [itemId])
      .then(() => {
        return db.query('DELETE FROM photos WHERE item_id = $1', [itemId]);
      })
      .then(() => {
        return db.query('DELETE FROM items WHERE id = $1', [itemId]);
      })
      .then(() => {
        console.log('Item deleted successfully');
      });
};

// testing
//deleteAdminListingItem(4)
//  .then(() => {
//    getAdminListingItems(4)
//      .then((items) => {
//          console.log(items);
//        })
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });
module.exports = { getAdminListingItems, addAdminListingItem, editAdminListingItem, markedSoldByAdmin, deleteAdminListingItem};
