const express = require("express");
const router = express.Router();
const fetchArticles = require('../middleware/database/fetch-articles'); // Import middleware
const articleRoutes = require("./articles"); // Import article routes
const basicsRoutes = require("./basics"); // Import basics routes
const loginRoutes = require("./login-and-registration"); // Import login and registration routes
const accountRoutes = require("./account"); // Import account routes
const taskRoutes = require("./tasks"); // Import task routes

// ************** Home Page Routes ************** 

router.get("/home", fetchArticles, (req, res) => {
    res.render("pages/home");
});

router.get("/", (req, res) => {
    res.render("pages/home", {
        user: req.session.user, // Pass the user object
        articles: res.locals.articles, // Pass the articles array
        topics: res.locals.topics, // Pass the topics array
        games: res.locals.games, // Pass the games array
    });
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
    res.render("pages/basics");
});

// ************** Games Page Routes **************

router.get("/games", (req, res) => {
    res.render("pages/games");
});

// Use other route files
router.use("/", articleRoutes);
router.use("/", basicsRoutes);
router.use("/", loginRoutes);
router.use("/", accountRoutes);
router.use("/", taskRoutes);

module.exports = router;
