const db = require("../connection");

const getItemPhotos = (itemId) => {
    const query = `
        SELECT url 
        FROM photos
        WHERE item_id = $1`;
    
    return db.query(query, [itemId])
        .then(result => {
            if (result.rows.length > 0) {
                console.log('Item photos fetched successfully:', result.rows);
                return result.rows;
            } else {
                console.log('No photos found for item ID:', itemId);
                return [];
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
};

//getItemPhotos(23)
module.exports = {getItemPhotos};