const mongoose = require("mongoose");

const HandleMongodb = (url) => {
  return mongoose.connect(url);
};
module.exports = { HandleMongodb };
