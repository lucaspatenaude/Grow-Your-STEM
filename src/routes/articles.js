const express = require("express");
const router = express.Router();
const fetchArticlesByAuthor = require('../middleware/database/fetch-articles-by-author'); // Import middleware

// ******** Dynamic Author Articles ********

router.get("/articles/:author", fetchArticlesByAuthor, (req, res) => {
    res.render("partials/pages/author");
});

// ******** Nathaniel's Articles ********

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

router.get("/articles/clay/whats-a-negative-price", (req, res) => {
    res.render("pages/articles/Clay/Negative-Price");
});

router.get("/articles/clay/meme-stocks-and-crypto", (req, res) => {
    res.render("pages/articles/Clay/Crypto");
});

// ******** Lucas' Articles ********

router.get("/articles/lucas/credit-and-financing-options", (req, res) => {
    res.render("pages/articles/Lucas/Credit-and-Financing-Options");
});

router.get("/articles/lucas/future-of-ai-in-the-workplace", (req, res) => {
    res.render("pages/articles/Lucas/Future-of-AI-in-the-Workplace");
});

router.get("/articles/lucas/investment-trends-2025", (req, res) => {
    res.render("pages/articles/Lucas/Investment-Trends-2025");
});

router.get("/articles/lucas/dangers-of-modern-investment-platforms", (req, res) => {
    res.render("pages/articles/Lucas/Dangers-of-Modern-Investment-Platforms");
});

router.get("/articles/lucas/popularity-of-options-trading", (req, res) => {
    res.render("pages/articles/Lucas/Popularity-of-Options-Trading");
});

module.exports = router;