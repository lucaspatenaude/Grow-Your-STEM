const express = require("express");
const router = express.Router();

// Define the home route
router.get("/", (req, res) => {
    console.log("User:", req.session.user);
    console.log("Articles:", res.locals.articles);
    console.log("Lessons:", res.locals.lessons);
    console.log("Games:", res.locals.games);

    res.render("pages/home", {
        user: req.session.user, // Pass the user object
        articles: res.locals.articles, // Pass the articles array
        lessons: res.locals.lessons, // Pass the lessons array
        games: res.locals.games, // Pass the games array
    });
});

module.exports = router;