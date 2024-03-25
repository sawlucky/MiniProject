var express = require("express");
var router = express.Router();
const bodyparser = require("body-parser");
router.use(bodyparser.json());

//setting up database;;
const { HandleMongodb } = require("../database/mongodb");
const { HandleSignup, HandleLogin } = require("../controllers/user");

HandleMongodb("mongodb://127.0.0.1:27017/miniproject")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("mongodb not connected");
  });

//middleware
const { logrequest } = require("../middleware/middleauth");
router.use(logrequest);
const { jwtAuthMiddleware } = require("../jwt");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", HandleSignup);
router.post("/login", HandleLogin);



module.exports = router;
