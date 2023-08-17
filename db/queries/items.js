const db = require("../connection");

const getAllItems = () => {
  return db.query("SELECT * FROM items;").then((data) => {
    return data.rows;
  });
};

// query item details and seller details
const getItem = (itemId) => {
  const query =
    "SELECT * FROM items JOIN users ON seller_id = users.id WHERE items.id = $1";
  return db.query(query, [itemId]).then((data) => {
    return data.rows[0];
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
      return data.rows[0];
    });
};

module.exports = { getAllItems, addItem, getItem };
