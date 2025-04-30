const express = require("express");
const router = express.Router();

// ************** Home Page Routes ************** 

router.get("/home", async (req, res) => {
    try {
        const user = req.session.user;

        if (user) {
            // Fetch tasks for the logged-in user
            const tasks = await db.any(
                "SELECT TaskName, IsCompleted FROM tasks WHERE UserID = $1",
                [user.UserID]
            );

            // Attach tasks to the user object
            user.tasks = tasks;
        }

        res.render("pages/home", { user });
    } catch (error) {
        console.error("Error fetching tasks:", error.message || error);
        res.render("pages/home", { message: "An error occurred", error: true });
    }
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

module.exports = router;
