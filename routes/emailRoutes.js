// routes/emailRoutes.js
const express = require("express");


const {
  sendEmail,
  scheduleEmailController,
  getAllScheduledEmails,
  cancelScheduledEmail,
  rescheduleEmail,
  getScheduledEmailById,
 // sendTemplateEmail,
} = require("../controllers/emailController");
const Authenticatetoken=require('../Middlewares/Authenticatetoken')


// const validateEmailSchedule=require("../Middlewares/ValidateEmailSchedule")
const router = express.Router();

// Route to send email immediately
router.post("/send",sendEmail);

// Route to schedule an email
router.post("/schedule", scheduleEmailController);
//Route to get all scheduled emails
router.get("/scheduled", getAllScheduledEmails)

//Route for cancelling scheduled email
router.delete("/scheduled/:id", cancelScheduledEmail)

//Route for rescheduling scheduled email
router.put("/scheduled/:id", rescheduleEmail)


router.get("/protected-route", (req, res) => {
  res.json({ message: "You have access to this route" });
});
router.get("/scheduled/:id",getScheduledEmailById);

module.exports = router;
