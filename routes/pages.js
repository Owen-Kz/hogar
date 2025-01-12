const express = require("express");
const homePage = require("../controllers/homePage");
const aboutPage = require("../controllers/aboutPage");
const contactPage = require("../controllers/contactPage");
const loginPage = require("../controllers/login");
const singleProduct = require("../controllers/singleProduct");
const faqPage = require("../controllers/faqPage");
const uploadPage = require("../controllers/uploadPage");
const router = express.Router();

router.use(express.json());

router.get("/", homePage)
router.get("/about", aboutPage)
router.get("/contact", contactPage)
router.get("/login", loginPage)
router.get("/faq", faqPage)
router.get("/product/:productSlug", singleProduct)
router.get("/upload", uploadPage)

router.get("*", homePage)


module.exports = router