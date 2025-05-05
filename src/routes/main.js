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

// Middleware to fetch articles, topics, and games and store them in sessions
router.get("/", (req, res) => {
    res.render("pages/home"); // No need to pass user, articles, topics, or games
});

router.get("/", (req, res) => {
    res.redirect("/home");
});

// ************** Blog Page Routes ************** 

router.get("/articles", (req, res) => {
    res.render("pages/articles");
});

// ************** Basics & Topics Page Routes ************** 

router.get("/basics", (req, res) => {
    res.render("pages/basics"); // No need to pass user or topics
});

// ************** Games Page Routes **************

router.get("/games", (req, res) => {
    res.render("pages/games");
});

// Use other route files
router.use("/", articleRoutes);
router.use("/", basicsRoutes);
router.use("/", loginRoutes);
router.use("/", taskRoutes);

module.exports = router;
