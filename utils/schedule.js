const cron = require("node-cron");
const transporter = require("../config/smtpConfig");
const ScheduledEmail = require("../models/scheduledEmailSchema");

const scheduleEmail = ({ to, subject, text, html, date, id }) => {
  // Convert date to JavaScript Date object
  const scheduledDate = new Date(date);

  // Extract the components of the date
  const minute = scheduledDate.getMinutes();
  const hour = scheduledDate.getHours();
  const dayOfMonth = scheduledDate.getDate();
  const month = scheduledDate.getMonth() + 1; // Month is 0-indexed in JavaScript
  const year = scheduledDate.getFullYear();

  // Cron expression format: "minute hour day-of-month month"
  // This will run the job at the specified minute, hour, and day of the month
  const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} *`;

  // Schedule the task using node-cron
  cron.schedule(cronExpression, async () => {
    try {
      // Check if the email still exists and hasn't been sent already
      const scheduledEmail = await ScheduledEmail.findById(id);

      if (!scheduledEmail || scheduledEmail.status !== "scheduled") {
        console.log(`Email with ID ${id} was canceled or already sent.`);
        return;
      }

      // Send the email
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        text,
        html,
      });

      // Update the email status to 'sent'
      await ScheduledEmail.findByIdAndUpdate(id, { status: "sent" });

      console.log("Scheduled email sent:", info);
    } catch (error) {
      console.error("Failed to send scheduled email:", error);

      // Update the email status to 'failed' if sending fails
      await ScheduledEmail.findByIdAndUpdate(id, { status: "failed" });
    }
  });
};

module.exports = scheduleEmail;
