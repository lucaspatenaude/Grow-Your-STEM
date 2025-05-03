const express = require("express");
const router = express.Router();

// Define the home route
router.get("/", (req, res) => {
    res.render("pages/home", {
        user: req.session.user, // Pass the user object
        articles: res.locals.articles, // Pass the articles array
        lessons: res.locals.lessons, // Pass the lessons array
        games: res.locals.games, // Pass the games array
    });
});

module.exports = router;