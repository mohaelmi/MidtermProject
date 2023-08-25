const express = require("express");
const router = express.Router();
const userAdminQueries = require("../db/queries/users");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require("twilio")(accountSid, authToken);

const sendMessage = function (sellerPhone, message) {
  console.log("test:", accountSid, authToken);
  console.log(sellerPhone);
  return twilio.messages
    .create({
      body: message, // 'Hey this is a test message.',  // req.body.message
      from: '+18643652977', //req.body.number // after you sign up you will have a virtual number from twilio
      to: sellerPhone, // req.body.userNumber  // add your number to test
    })
    .then((message) => {
      return message.accountSid;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// // Send message route
router.post("/", (req, res) => {
  console.log("in sms route!");
  const userId = req.body.sellerId;
  const buyerPhone = req.body.phoneNumber;
  const buyerMessage = req.body.message;
  console.log(buyerMessage);
  userAdminQueries
    .getUserById(userId)
    .then((user) => {
      const sellerPhone = user.phone;
      console.log(sellerPhone);
      sendMessage(sellerPhone, buyerMessage).then((data) => {
        console.log(data);
        res.send({ data });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
