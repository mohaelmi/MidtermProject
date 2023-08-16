DROP TABLE IF EXISTS wishlisted_items CASCADE;
CREATE TABLE wishlisted_items (
    id SERIAL PRIMARY KEY,
    wishlist_id  INT NOT NULL,
    item_id INT NOT NULL,
    FOREIGN KEY (wishlist_id) REFERENCES wishlist(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);