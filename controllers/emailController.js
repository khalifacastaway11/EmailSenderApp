// controllers/emailController.js
const transporter = require("../config/smtpConfig");
const scheduleEmail = require("../utils/schedule");
const ScheduledEmail = require("../models/scheduledEmailSchema");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");

// Send Email Immediately
const sendEmail = async (req, res) => {
  const { to, subject, text, html, attachments } = req.body;
   //console.log(req.body);
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
    attachments,
  };

  let info;
  try {
    info = await transporter.sendMail(mailOptions).catch((err) => {
      console.error("Nodemailer error:", err);
      throw err; // Rethrow to trigger the outer catch block
    });
    res.json({ message: "Email sent successfully!", info });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};
// console.log(sendEmail);

// Schedule Email
const scheduleEmailController = async (req, res, next) => {
  const { to, subject, text, html, date } = req.body;

  try {
    //store the scheduled email in the database
    const scheduledEmail = new ScheduledEmail({
      to,
      subject,
      text,
      html,
      date,
    });

    await scheduledEmail.save();
    
    //schedule the email
     scheduleEmail({ to, subject, text, html, date, id: scheduledEmail._id });

    res.status(200).json({
      status: "success",
      message: "Email scheduled and stored successfully!",
    });
  } catch (error) {
    next(error);
  }
};
const getAllScheduledEmails = async (req, res, next) => {
  try {
    const emails = await ScheduledEmail.find();
    res.status(200).json({
      status: "success",
      data: emails,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel a scheduled email
const cancelScheduledEmail = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find and delete the scheduled email from the database
    const deletedEmail = await ScheduledEmail.findByIdAndDelete(id);

    if (!deletedEmail) {
      return res.status(404).json({ status: "error", message: "Email not found" });
    }

    // Email successfully canceled
    res.status(200).json({ status: "success", message: "Scheduled email canceled successfully!" });
  } catch (error) {
    next(error);
  }
};

// Reschedule a scheduled email
const rescheduleEmail = async (req, res, next) => {
  const { id } = req.params;
  const { date, to, subject, text, html } = req.body;

  try {
    // Find the scheduled email by ID and update it with the new data
    const updatedEmail = await ScheduledEmail.findByIdAndUpdate(
      id,
      { date, to, subject, text, html },
      { new: true, runValidators: true }
    );

    if (!updatedEmail) {
      return res.status(404).json({ status: "error", message: "Email not found" });
    }

    // Email successfully rescheduled
    res.status(200).json({
      status: "success",
      message: "Scheduled email rescheduled successfully!",
      data: updatedEmail,
    });
  } catch (error) {
    next(error);
  }
};

const getScheduledEmailById=async(req,res,next)=>{
  const {id}=req.params;
  try{
    const email=await ScheduledEmail.findById(id);
    if(!email){
      return res.status(404).json({status:"error",message:"Email not found"});
    }
    res.status(200).json({status:"success",data:email});
} catch(error){
  next(error);
}
};

module.exports = {
  sendEmail,
  scheduleEmailController,
  getAllScheduledEmails,
  cancelScheduledEmail,
  rescheduleEmail,
  getScheduledEmailById
};