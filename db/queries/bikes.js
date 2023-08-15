const db = require("../connection");

const getAllBikes = () => {
  return db.query("SELECT * FROM bikes;").then((data) => {
    return data.rows;
  });
};

const getMyBikes = (query, userId) => {
  return db.query("SELECT * FROM bikes;").then((data) => {
    return data.rows;
  });
};

const addBike = (bike) => {
  return db.query("INSERT --- RETURNING *;").then((data) => {
    return data.rows;
  });
};

module.exports = { getAllBikes, addBike, getMyBikes };
