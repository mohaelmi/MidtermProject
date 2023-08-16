// All routes for bikes are here

const express = require("express");
const router = express.Router();
const bikesQueries = require("../db/queries/bikes");

//show all bikes in the main page
router.get("/bikes", (req, res) => {
  bikesQueries
    .getAllBikes()
    .then((bikes) => {
      res.json({ bikes });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// add a new bike as authenticate user. taking userId fro session. we can also do it manually by passing it as an id
router.post("/bikes", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "error" });
  }

  const newBike = req.body;
  newBike.seller_id = userId;
  bikesQueries
    .addBike(newBike)
    .then((bike) => {
      res.send(bike);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// route for displaying specfic bikes related for a user
router.get("/bikes/:id", (req, res) => {
  const userId = req.params.id;
  bikesQueries
    .getMyBikes(userId)
    .then((bikes) => {
      res.json({ bikes });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
