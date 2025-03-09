const express = require("express");
const homePage = require("../controllers/homePage");
const aboutPage = require("../controllers/aboutPage");
const contactPage = require("../controllers/contactPage");
const loginPage = require("../controllers/login");
const singleProduct = require("../controllers/singleProduct");
const faqPage = require("../controllers/faqPage");
const uploadPage = require("../controllers/uploadPage");
const uploadProduct = require("../controllers/uploadItem");
const login = require("../controllers/auth/login");
const products = require("../controllers/AllProducts");
const otherProducts = require("../controllers/otherProducts");
const productCategory = require("../controllers/productsCategory");
const Register = require("../controllers/auth/register");
const siteMap = require("../controllers/services/sitemap");
const router = express.Router();

router.use(express.json());

router.get("/", (req,res) =>{
    res.render("landing")
})
router.get("/home", homePage)
router.get("/about", aboutPage)
router.get("/contact", contactPage)
router.get("/login", loginPage)
router.get("/faq", faqPage)
router.get("/product/:productSlug/:productID", singleProduct)
router.get("/upload", uploadPage)
router.post("/allProducts", products)

router.post("/upload", uploadProduct)
router.post("/userLogin", login) 
// router.post("/userRegister", Register)
router.get("/otherProducts", otherProducts)
router.get("/category/:category", productCategory)

router.get('/sitemap.xml', siteMap)
 

router.get("/landingPageOld", (req,res) =>{
    res.render("landingPage")
})
// router.get("/search")
 
router.get("*", (req,res) =>{
    res.render("404")
})


module.exports = router