const express = require("express");
const router = express.Router();




const sendMessage = function() {

  const sid = 'AC2004a2bdfd44c104fb84d95ae4b69a81';
  const authToken = '9b765671e709c5c6b70870423733ddfa';
  const twilio = require('twilio')(sid, authToken);

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
      res.status(500).json({ error: err.message });
    });
  
  
});





module.exports = router;