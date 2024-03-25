const ShortUrlSchema = require("../models/shortUrl");

const HandleHome = async (req, res) => {
  const shortedUrl = await ShortUrlSchema.find();

  return res.status(200).render("short", { shortedUrl: shortedUrl });
};
const HandleURL = async (req, res) => {
  const URL = req.body.fullUrl;
  console.log(URL);
  try {
    const set = await ShortUrlSchema.create({
      url: URL,
    });
    return res.status(200).redirect("/users");
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
};

const HanldeParams = async (req, res) => {
  try {
    const shortURL = req.params.Urlshort;
    console.log(shortURL);
    const check = await ShortUrlSchema.findOne({ shortURL: shortURL });
    if (!check) return res.redirect("/users");
    check.click++;
    await check.save();

    return res.redirect(check.url);
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
};
module.exports = { HandleHome, HandleURL, HanldeParams };
