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

// ************** Lessons Page Routes ************** 

router.get("/lessons", (req, res) => {
    res.render("pages/lessons");
});

// ************** Games Page Routes **************

router.get("/games", (req, res) => {
    res.render("pages/games");
});

// ************** Article Page Routes **************

router.get("/article", (req, res) => {
    res.render("pages/articles/example-article");
});

// ******** Nathaniel's Articles ********

router.get("/articles/nathaniel/how-do-tariffs-work", (req, res) => {
    res.render("pages/articles/Nathaniel/How-Do-Tariffs-Work");
});

// ******** Clay's Articles ********

router.get("/articles/clay/retirement-accounts", (req, res) => {
    res.render("pages/articles/Clay/Retirement-Accounts");
});

// ******** Lucas' Articles ********

router.get("/articles/lucas/credit-and-financing-options", (req, res) => {
    res.render("pages/articles/Lucas/Credit-and-Financing-Options");
});

// ******** Account Page Route ********

router.get("/account", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login"); // Redirect to login if user is not logged in
    }
    res.render("partials/pages/user-menu/account-screen", {
        user: req.session.user,
        tasks: res.locals.tasks, // Pass tasks explicitly if needed
    });
});

module.exports = router;
