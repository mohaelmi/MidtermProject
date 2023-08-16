//All the routes for the user will be here

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("users");
});

module.exports = router;
