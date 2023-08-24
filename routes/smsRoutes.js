const express = require("express");
const router = express.Router();
const userQuery = require('../db/queries/users')




const sendMessage = function(data, phoneNumber) {

  const sid = 'AC2004a2bdfd44c104fb84d95ae4b69a81';
  const authToken = '9b765671e709c5c6b70870423733ddfa';
  const twilio = require('twilio')(sid, authToken);
  console.log(phoneNumber);
 return twilio.messages
      .create({
          body: data,  // req.body.message
          from: '+18643652971', //req.body.number // after you sign up you will have a virtual number from twilio
          to: phoneNumber // req.body.userNumber  // add your number to test
      })
      .then((message) => {
        console.log(message);
        return message
      })
}


// // Send message route
router.post("/", (req, res) => {
  console.log("in sms route!");
  const userId = req.session.user_id;
  const message = req.body.data;
  const sellerId = req.body.sellerId;


  console.log(message, sellerId);

  if (!userId) {
    return res.send({ error: "Please Login" });
  }

  userQuery
  .getUserById(sellerId)
  .then((user) => {
    const phoneNumber = user.phone;
    sendMessage(message, phoneNumber)
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      });
  });


});




module.exports = router;
