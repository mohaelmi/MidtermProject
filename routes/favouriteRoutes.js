//All the routes for the user will be here

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/userWishlistFunctions");

// Get user wishLists
router.get("/", (req, res) => {
  const userId = req.session.user_id;
  console.log("inside");
  if (!userId) {
    return res.send({ error: "Please Login" });
  }
  userQueries
    .getUserWishlist(userId)
    .then((items) => {
      res.json({ items });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Add Wishlist // click favorite button
router.post("/:id", (req, res) => {
  console.log("post addFav");
  const userId = req.session.user_id;
  const itemsId = req.params.id;

  if (!userId) {
    return res.send({ error: "Please Login" });
  }

  userQueries
    .addToWishlist(userId, itemsId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Remove item from Wishlist // click favorite button
router.get("/:id", (req, res) => {
  const userId = req.session.user_id;
  const itemsId = req.params.id;

  if (!userId) {
    return res.send({ error: "Please Login" });
  }

  userQueries
    .removeFromWishlist(userId, itemsId)
    .then(() => {
      res.json("Item has been removed from wishlist");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
