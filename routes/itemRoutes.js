// All routes for bikes are here

const express = require("express");
const router = express.Router();
const itemsQueries = require("../db/queries/items");
const adminQueries = require("../db/queries/adminListingFunctions");

//show all items
router.get("/", (req, res) => {
  const userId = req.session.user_id;
  console.log(userId);
  itemsQueries
    .getAllItems()
    .then((items) => {
      //res.render("index", { items });
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
  //add new bike
  const newBike = req.body;
  newBike.seller_id = userId;
  itemsQueries
    .addItem(newBike)
    .then((bike) => {
      res.send(bike);
      console.log("new bike has been added!");
    })
    .catch((e) => {
      console.error(e.message);
      res.send(e.message);
    });
});

// Get specific item 
router.get("/:id", (req, res) => {
  const itemId = req.params.id;
  itemsQueries
    .getItem(itemId)
    .then((item) => {
      res.json({ item });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// mark as sold
router.get("/status/:id", (req, res) => {
  const itemId = req.params.id;

  // const userId = req.session.user_id;
  // if (!userId) {
  //   return res.send({ error: "error" });
  // }

  adminQueries
    .markedSoldByAdmin(itemId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// delete item
router.get("/delete/:id", (req, res) => {
  const itemId = req.params.id;
  const userId = req.session.user_id;

  if (!userId) {
    return res.send({ error: "error" });
  }

  itemsQueries
    .deleteItem(itemId, userId)
    .then((data) => {
      res.end(data);
      console.log("item deleted deleted..");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// //CLICK update button / send updated bike
router.post("/:id", (req, res) => {
  const userId = req.session.user_id;
  const itemId = req.params.id;
  const updatedItem = req.body;

  if (!userId) {
    console.log('session null');
    return res.send({ error: "please login in first" });
  }

  adminQueries
    .editAdminListingItem(itemId, updatedItem)
    .then((updatedItem) => {
      res.send({ updatedItem });
      console.log(updatedItem, "new bike has been added!");
    })
    .catch((e) => {
      console.error(e.message);
      res.send(e.message);
    });
});

module.exports = router;
