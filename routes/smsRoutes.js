const express = require("express");
const router = express.Router();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);



const sendMessage = function() {


  return twilio.messages
      .create({
          body: 'Hey this is a test message.',  // req.body.message
          from: '', //req.body.number // after you sign up you will have a virtual number from twilio
          to: '' // req.body.userNumber  // add your number to test 
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
  const userId = req.session.user_id;

  if (!userId) {
    return res.send({ error: "Please Login" });
  }

  sendMessage()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
  
  
});





module.exports = router;