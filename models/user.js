//models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//create user schema
const userSchema = new mongoose.Schema({
  username:{type:String, required:true, unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshTokens: { type: [String], default: [] },
});

userSchema.pre("save", async function (next){
    if (this.isModified("password")) {
      console.log("Hashing password before saving..."); // ✅ Log password hashing
      this.password=await bcrypt.hash(this.password,10)
    }
    next();
})

const User = mongoose.model("User", userSchema)
module.exports = User;