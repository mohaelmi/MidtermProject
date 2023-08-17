
const db = require('../connection'); 

const filterItems = (filters) => {
const {city, minPrice, maxPrice, type, condition, size, keyword} = filters;
  const queryParams = [];
  let queryString = `SELECT * FROM items WHERE 1 = 1`;

  if (city) {
    queryParams.push(`%${city}%`);
    queryString += ` AND city ILIKE $${queryParams.length}`;
     }
  if (minPrice) {
    queryParams.push(minPrice);
    queryString += ` AND price >= $${queryParams.length}`;
    }
  if (maxPrice) {
    queryParams.push(maxPrice);
    queryString += ` AND price <= $${queryParams.length}`;
    }
  if (type) {
    queryParams.push(`%${type}%`);
    queryString += ` AND type ILIKE $${queryParams.length}`;
    }
  if (condition) {
    queryParams.push(`%${condition}%`);
    queryString += ` AND condition ILIKE $${queryParams.length}`;
    }
  if (size) {
    queryParams.push(`%${size}%`);
    queryString += ` AND size ILIKE $${queryParams.length}`;
    }
  if (keyword) {
    queryParams.push(`%${keyword}%`);
    queryString += ` AND (title ILIKE $${queryParams.length} OR description ILIKE $${queryParams.length})`;
    }

  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(error => {
      console.error('Error filtering items:', error);
      throw error;
    });
};


//testing
//const filters = {
//    city: '',
//    minPrice: 300.00,
//    maxPrice: 1000.00,
//    type: "",
//    condition: "",
//    size: 'M',
//    keyword: 'enjoy',
//};
//filterItems(filters)
//  .then((res) => {
//          console.log(res);
//  })
//  .catch(error => {
//    console.error('Error:', error);
//  });
module.exports = { filterItems };
