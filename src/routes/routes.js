const express = require("express");
const router = express.Router();
const fetchArticlesByAuthor = require('../middleware/database/fetch-articles-by-author'); // Import middleware
const fetchArticles = require('../middleware/database/fetch-articles'); // Import middleware

// ************** Home Page Routes ************** 

router.get("/home", fetchArticles, (req, res) => {
    res.render("pages/home");
});

router.get("/", (req, res) => {
    res.redirect("/home");
});

// ************** Blog Page Routes ************** 

router.get("/blog", (req, res) => {
    res.render("pages/blog");
});

// ************** Lessons Page Routes ************** 

router.get("/basics", (req, res) => {
    res.render("pages/basics");
});

// ************** Games Page Routes **************

router.get("/games", (req, res) => {
    res.render("pages/games");
});

// ************** Article Page Routes **************

router.get("/article", (req, res) => {
    res.render("pages/articles/example-article");
});

// ******** Nathaniel's Page & Articles ********

router.get("/articles/nathaniel/how-do-tariffs-work", (req, res) => {
    res.render("pages/articles/Nathaniel/How-Do-Tariffs-Work");
});

// ******** Clay's Articles ********

router.get("/articles/clay/retirement-accounts", (req, res) => {
    res.render("pages/articles/Clay/Retirement-Accounts");
});

router.get("/articles/clay/global-reserve", (req, res) => {
    res.render("pages/articles/Clay/Global-Reserve");
});

// ******** Lucas' Articles ********

router.get("/articles/lucas/credit-and-financing-options", (req, res) => {
    res.render("pages/articles/Lucas/Credit-and-Financing-Options");
});

router.get("/articles/:author", fetchArticlesByAuthor, (req, res) => {
    const { author } = req.params;
    res.render("partials/pages/author", { author });
});

module.exports = router;
