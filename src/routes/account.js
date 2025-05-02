const express = require("express");
const router = express.Router();

// Define the home route
router.get("/", (req, res) => {
    console.log("User:", req.session.user);
    console.log("Tasks:", res.locals.tasks);
    res.render("pages/home", {
        user: req.session.user, // Pass the user object
        tasks: res.locals.tasks, // Pass the tasks array
    });
});

module.exports = router;