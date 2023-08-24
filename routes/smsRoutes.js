const express = require("express");
const router = express.Router();
const userAdminQueries = require("../db/queries/users");


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);



const sendMessage = function(sellerPhone, buyerPhone, message) {


  return twilio.messages
      .create({
          body: message, // 'Hey this is a test message.',  // req.body.message
          from: buyerPhone, // '+18643652977' //req.body.number // after you sign up you will have a virtual number from twilio
          to: sellerPhone // req.body.userNumber  // add your number to test 
      })
      .then((message) => {
        return message
      })
      .catch((err) => {
        console.log(err.message);
      });

}

// // Send message route
router.post("/", (req, res) => {
  console.log("in sms route!");
  const userId = req.body.seller_id;
  const buyerPhone = req.body.cell 
  const message = req.body.message 

  if (!userId) {
    return res.send({ error: "Please Login" });
  }

  userAdminQueries
    .getUserById(userId)
    .then((user) => {
      const sellerPhone = user.phone;
    sendMessage(sellerPhone, buyerPhone, message)
    .then((data) => {
      res.json({ data });
    })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

  
  
});





module.exports = router;