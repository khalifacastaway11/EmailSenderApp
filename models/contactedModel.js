//model.contactedModel.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);


module.exports = Contact;