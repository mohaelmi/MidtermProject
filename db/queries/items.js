const db = require("../connection");

const getAllItems = () => {
  return db.query("SELECT * FROM items JOIN photos ON items.id = photos.item_id;").then((data) => {
    return data.rows;
  });
};

// show an item details 
const getItem = (itemId) => {
  const query = "SELECT * FROM items WHERE id = $1";
  return db.query(query, [itemId]).then((data) => {
    return data.rows[0];
  });
};

// delete items as a seller
const deleteItem = (itemId, seller_id) => {
  return db
    .query("DELETE FROM items WHERE id = $1 AND seller_id = $2", [
      itemId,
      seller_id,
    ])
    .then(() => {
      return "item deleted successfully";
    });
};


const filterByPrice = (minPrice, maxPrice) => {

  return db
    .query("SELECT * FROM items WHERE price >= $1 AND price <= $2;", [
      minPrice,
      maxPrice,
    ])
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    });
};

const addItem = (bike) => {
  console.log(bike);
  const query = `INSERT INTO items  (seller_id, title, description, 
    price, type, size, status, condition, city) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;
  return db
    .query(query, [
      bike.seller_id,
      bike.title,
      bike.description,
      bike.price,
      bike.type,
      bike.size,
      bike.status,
      bike.condition,
      bike.city,
    ])
    .then((data) => {
      console.log('id', data.rows[0].id);
      return db.query("INSERT INTO photos (item_id, url) VALUES ($1, $2)", [data.rows[0].id, bike.imgUrl]);
    })
    .then((data) => {
      console.log('from query: ', data.rows[0]);
      return data.rows[0];
    })
  };

module.exports = { getAllItems, addItem, getItem, deleteItem, filterByPrice };
