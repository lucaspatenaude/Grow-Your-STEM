const express = require("express");
const router = express.Router();
const fetchArticles = require('../middleware/database/fetch-articles'); // Import middleware
const articleRoutes = require("./articles"); // Import article routes
const basicsRoutes = require("./basics"); // Import basics routes
const loginRoutes = require("./login-and-registration"); // Import login and registration routes
const taskRoutes = require("./tasks"); // Import task routes

// ************** Home Page Routes ************** 

router.get("/home", fetchArticles, (req, res) => {
    res.render("pages/home");
});

router.get("/", (req, res) => {
    res.render("pages/home");
});

router.get("/", (req, res) => {
    res.redirect("/home");
});

// ************** Articles Page Route ************** 

router.get("/articles", (req, res) => {
    res.render("pages/articles");
});

// ************** Basics & Topics Page Route ************** 

router.get("/basics", (req, res) => {
    res.render("pages/basics");
});

// ************** Games Page Route **************

router.get("/games", (req, res) => {
    res.render("pages/games");
});

// Use other route files
router.use("/", articleRoutes);
router.use("/", basicsRoutes);
router.use("/", loginRoutes);
router.use("/", taskRoutes);

module.exports = router;
