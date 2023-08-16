const db = require("../connection");

const getAllBikes = () => {
  return db.query("SELECT * FROM bikes;").then((data) => {
    return data.rows;
  });
};

const getMyBikes = (sellerId) => {
  const query = "SELECT * FROM items WHERE seller_id = $1";
  return db.query(query, [sellerId]).then((data) => {
    return data.rows;
  });
};

const addBike = (bike) => {
  const query = `INSERT INTO items  (seller_id, title, description, price, type, size, status, condition, city) VALUES ($1, $2, $3, $4, $5 $6, $7 $8, $9) RETURNING *;`;
  return db
    .query(query, [
      bike.selle_id,
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
      return data.rows;
    });
};

module.exports = { getAllBikes, addBike, getMyBikes };
