const UserSchema = require("./../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("./../jwt");
const HandleSignup = async (req, res) => {
  const body = req.body;
  try {
    const user = new UserSchema(body);
    const response = await user.save();
    const payload = {
      _id: response._id,
    };
    const token = generateToken(payload);
    res.status(200).send({ response, token });
  } catch (err) {
    res.status(404).send({ error: "internal server error" });
  }
};

const HandleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ error: "Please provide both email and password" });
    }

    const user = await UserSchema.findOne({ email: email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: "Incorrect email or password" });
    }
    const payload = {
      _id: user.id,
    };
    const token = generateToken(payload);
    return res.status(200).send({ user, token });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { HandleSignup, HandleLogin };
