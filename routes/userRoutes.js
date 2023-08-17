//All the routes for the user will be here

const express = require("express");
const router = express.Router();
const usersQueries = require("../db/queries/users");

// Getting all users
router.get("/", (req, res) => {
  usersQueries
    .getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get user by its id
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  usersQueries
    .getUserById(userId)
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get items belong to a user
router.get("/items/:id", (req, res) => {
  const userId = req.params.id;
  usersQueries
    .getMyItems(userId)
    .then((items) => {
      res.json({ items });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Create New User // we may not need that
router.post("/new", (req, res) => {
  const user = JSON.parse(req.body);
  // const user = req.body;
  console.log("user: ", user);
  usersQueries
    .addNewUser(user)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
module.exports = router;
