const express = require("express");
const router = express.Router();
const fetchArticlesByAuthor = require('../middleware/database/fetch-articles-by-author'); // Import middleware

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

// ******** Dynamic Author Articles ********

router.get("/articles/:author", fetchArticlesByAuthor, (req, res) => {
    const { author } = req.params;
    res.render("partials/pages/author", { author });
});

module.exports = router;