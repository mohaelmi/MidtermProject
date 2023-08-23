const express = require("express");
const router = express.Router();
const userAdminQueries = require("../db/queries/users");

// Getting all users/sellers
router.get("/", (req, res) => {
  userAdminQueries
    .getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get items belong to a seller
router.get("/items", (req, res) => {
  const userId = req.session.user_id;
  console.log(userId);
  userAdminQueries
    .getMyItems(userId)
    .then((items) => {
      res.json({ items });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});




// Get user by its id
router.get("/:id", (req, res) => {
  console.log("ssss");
  const userId = req.params.id;
  userAdminQueries
    .getUserById(userId)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


// Create New User // we may not need this
router.post("/new", (req, res) => {
  const user = JSON.parse(req.body);
  // const user = req.body;
  console.log("user: ", user);
  userAdminQueries
    .addNewUser(user)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


module.exports = router;
