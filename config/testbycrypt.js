const bcrypt = require("bcryptjs");

const plainPassword = "asd100200";
const hashedPassword = "$2a$10$1YAA5dBC75axlAV5YE4IJeajMT.PsCW/2ZBDlFl3rmbXpTGVytFSm"; // Retrieved from DB

bcrypt.compare(plainPassword, hashedPassword).then((match) => {
  console.log("Password match:", match);
});