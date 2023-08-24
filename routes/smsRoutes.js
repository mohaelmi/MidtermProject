const express = require("express");
const router = express.Router();
const userAdminQueries = require("../db/queries/users");


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio')(accountSid, authToken);


const sendMessage = function(sellerPhone, message) {
  

     twilio.messages
      .create({
          body: message, // 'Hey this is a test message.',  // req.body.message
          from: '+18643652977', //buyerPhone, // '+18643652977' //req.body.number // after you sign up you will have a virtual number from twilio
          to: sellerPhone // req.body.userNumber  // add your number to test 
      })
      .then((message) => {
        return message.accountSid
      })
      .catch((err) => {
        console.log(err);
        return err
      });

}

// // Send message route
router.post("/", (req, res) => {
  console.log("in sms route!");
  const userId = req.body['user-id'];
  const buyerPhone = req.body['user-cell']; 
  const message = req.body['user-message']; 
 

  userAdminQueries
    .getUserById(userId)
    .then((user) => {
      const sellerPhone = user.phone;
      console.log('seller phone: ', sellerPhone, 'buyer: ', buyerPhone, 'message: ',  message );
    sendMessage(sellerPhone, message)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

  
  
});





module.exports = router;