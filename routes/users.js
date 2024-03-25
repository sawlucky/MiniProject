var express = require("express");
const {
  HandleHome,
  HandleURL,
  HanldeParams,
} = require("../controllers/shortUrl");
var router = express.Router();

router.get("/", HandleHome);
router.post("/short", HandleURL);
router.get("/:Urlshort", HanldeParams);
module.exports = router;
