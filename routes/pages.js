const express = require("express");
const homePage = require("../controllers/homePage");
const aboutPage = require("../controllers/aboutPage");
const contactPage = require("../controllers/contactPage");
const router = express.Router();

router.use(express.json());

router.get("/", homePage)
router.get("/about", aboutPage)
router.get("/contact", contactPage)

router.get("*", homePage)


module.exports = router