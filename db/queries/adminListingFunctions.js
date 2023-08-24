const db = require('../connection');
const photos = require('./photos');
//1.// Getting all items listed by a seller_id(admin)
const getAdminListingItems = (sellerId) => {
  return db.query(
    `SELECT * FROM items as i 
     JOIN photos as p ON i.id = p.item_id
     WHERE i.seller_id = $1`
     , [sellerId])
    .then((items) => {
      return items.rows;
    });
};
//// testing

//getAdminListingItems(1)
//  .then(items => {
//    console.log('Admin list:', items);
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });


//2.//Adding(listing) a new item.

const addAdminListingItem = (sellerId, newItem) => {
  const { title, description, price, type, size, status, condition, city, photoUrls } = newItem;

  return db.query(`INSERT INTO items (seller_id, title, description, price, type, size, status, condition, city)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
                   [sellerId, title, description, price, type, size, status, condition, city])
    .then(item => {
      if (photoUrls && photoUrls.length > 0) {
            for (let i = 0; i < photoUrls.length; i++) {
                 db.query(`INSERT INTO photos (item_id, url)
                        VALUES ($1, $2)`,
                        [item.rows[0].id, photoUrls[i]]);
                        console.log([item.rows[0].id, photoUrls[i]]);
              }
        
      } return item;
    })
    .then((item) => {
      console.log('Item id created :', item.rows[0].id);
      return item.rows[0].id;
    })
    .catch(error => {
      console.error('Error adding item:', error);
      throw error;
    });
};

//testing
// const newItem = {
//     title: 'Mountain Bike2',
//     description: 'A high-performance mountain bike for adventurous riders.',
//     price: 1200.00,
//     type: 'Sports Equipment',
//     size: 'L',
//     status: 'Available',
//     condition: 'Used',
//     city: 'Seattle',
//     photoUrls: ['A.com','B.com']
//   };

// addAdminListingItem(3, newItem)
//   .then((newItemId) => {
//         photos.getItemPhotos(newItemId)
//         .then((items) => {
//           console.log(items);
//         })
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });



//3. Editting an item's values posted by the seller_id(admin)



// const editAdminListingItem = async (itemId, newItem) => {
//   const { title, description, price, type, size, status, condition, city, photoUrls } = newItem;

//   try {
//     const updatedItem = await db.query(`UPDATE items
//                    SET title = $1, description = $2, price = $3, type = $4, size = $5, status = $6, condition = $7, city = $8
//                    WHERE id = $9
//                    RETURNING *`,
//                    [title, description, price, type, size, status, condition, city, itemId]);

//     if (photoUrls && photoUrls.length > 0) {
//       await db.query(`DELETE FROM photos WHERE item_id = $1`, [itemId]);
//       await insertPhotos(updatedItem.rows[0].id, photoUrls);
//     }

//     console.log('Item updated:', updatedItem.rows[0].id);
//     return updatedItem.rows[0].id;
//   } catch (error) {
//     console.error('Error updating item:', error);
//     throw error;
//   }
// };

//testing

// const newItemValues = {
//   title: 'Edited Bikec6',
//   description: 'A better description',
//   price: 1000.00,
//   type: 'hybrid',
//   size: 'M',
//   status: 'Available',
//   condition: 'Like New',
//   city: 'Testville',
//   photoUrls: ['c5787878.com', 'd57878784.com', 'sdsd.ir']
// };

// editAdminListingItem(3, newItemValues)
//   .then((itemId) => {
//     photos.getItemPhotos(itemId)
//       .then((items) => {
//         console.log(items);
//       })
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


//testing

// const newItemValues = {
//  title: 'Edited Bikec6',
//  description: 'A better description',
//  price: 1000.00,
//  type : 'hybrid',
//  size: 'M',
//  status: 'Available',
//  condition: 'Like New',
//  city: 'Testville',
//  photoUrls : ['c5787878.com','d57878784.com','sdsd.ir']
// };

// editAdminListingItem(13, newItemValues)
//  .then((itemId) => {
//    //console.log('photos:', photos);
//    return photos.getItemPhotos(itemId)
//      .then((items) => {
// //          console.log(("ITEMS" , items));
// //        })
// //  })
// //  .catch(error => {
// //    console.error('Error:', error);
// //  });
// console.log("Before editAdminListingItem");
// editAdminListingItem(13, newItemValues)
//   .then((itemId) => {
//     console.log("After editAdminListingItem, itemId:", itemId);
//     return photos.getItemPhotos(itemId);
//   })
//   .then((items) => {
//     console.log("ITEMS", items);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// console.log("After everything");
// //4.// Changing the status of an item to SOLD! by the seller_id(admin)

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
    return db.query('DELETE FROM wishlist WHERE item_id = $1', [itemId])
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
module.exports = { getAdminListingItems, addAdminListingItem, markedSoldByAdmin, deleteAdminListingItem};
