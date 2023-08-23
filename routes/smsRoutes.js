const express = require("express");
const router = express.Router();


// // Send message route
router.post("/", (req, res) => {
  console.log("in sms route!");
  const userId = req.session.user_id;

  if (!userId) {
    return res.send({ error: "Please Login" });
  }

  // haven't implementented query function for that yet

  // messageQuery
  //   .sendMessage(userId, message)
  //   .then((data) => {
  //     res.json(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err.message });
  //   });
});


module.exports = router;