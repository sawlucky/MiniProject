const mongoose = require("mongoose");
const shortid = require("shortid");

const ShortUrlSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    shortURL: {
      type: String,
      required: true,
      default: shortid.generate(),
    },
    click: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ShortUrl", ShortUrlSchema);
