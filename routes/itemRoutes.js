// All routes for bikes are here

const express = require("express");
const router = express.Router();
const itemsQueries = require("../db/queries/items");

//show all items
router.get("/", (req, res) => {
  const userId = req.session.user_id;
  console.log(userId);
  itemsQueries
    .getAllItems()
    .then((items) => {
      res.json({ items });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// add a new bike as authenticate user. taking userId fro session. we can also do it manually by passing it as an id
router.post("/", (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.send({ error: "error" });
  }

  const newBike = req.body;
  newBike.seller_id = userId;
  itemsQueries
    .addItem(newBike)
    .then((bike) => {
      res.send(bike);
    })
    .catch((e) => {
      console.error(e.message);
      res.send(e.message);
    });
});

// route for displaying specfic items related for a user
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  itemsQueries
    .getMyItems(userId)
    .then((items) => {
      res.json({ items });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
