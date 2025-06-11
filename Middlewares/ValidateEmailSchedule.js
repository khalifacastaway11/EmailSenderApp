//Middlewares/VAlidateEmailSchedule.js
const validator = require('validator')
const { isValidCorn } = require('cron-validator')

const validateEmailSchedule = (req, res, next) => {
    const { to, subject, text, html, date } = req.body;
    //validate email
    if (!to || !validator.isEmail(to)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid email address",
            details: { field: "to" },
        });
    }
    // Validate cron expression
    if (!isValidCorn(date)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid cron expression",
            details: { field: "date", format: "Corn format:* * * * *" },
        });
    }

    // Validate subject
    if (!subject || subject.trim() == "") {
        return res.status(400).json({
            status: "error",
            message: "Subject is required",
            details: { field: "subject" },
        });
    }
    //validate email body
    if (!text && !html) {
        return res.status(400).json({
            status: "error",
            message: "Email body is required",
            details: { field: "text or html" },
        });
    }
    next()
};

module.exports = validateEmailSchedule;