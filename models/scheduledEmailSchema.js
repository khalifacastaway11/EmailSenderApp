const mongoose = require('mongoose');
const scheduledEmailSchema = new mongoose.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    html: { type: String },
    date: { type: String, required: true },
    status: { type: String, default: 'scheduled' },
    createdAt:{type: Date, default:Date.now}
})

const ScheduledEmail = mongoose.model("scheduledEmail", scheduledEmailSchema);
module.exports = ScheduledEmail;