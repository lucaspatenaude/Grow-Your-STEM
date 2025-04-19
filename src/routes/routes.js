const express = require("express");
const router = express.Router();

// ************** Home Page Routes ************** 

router.get("/home", (req, res) => {
    res.render("pages/home");
});

router.get("/", (req, res) => {
    res.redirect("/home");
});

// ************** Blog Page Routes ************** 

router.get("/blog", (req, res) => {
    res.render("pages/blog");
});

// ************** Games Page Routes **************

router.get("/games", (req, res) => {
    res.render("pages/games");
});

module.exports = router;
