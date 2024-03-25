const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const person = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(person.password, salt);
    person.password = hashPassword;
    // await person.save();
    next();
  } catch (error) {
    console.log(error);
  }
});
module.exports = mongoose.model("User", UserSchema);
