const express = require("express");
const router = express.Router();

router.get("/account", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login"); // Redirect to login if user is not logged in
    }
    res.render("partials/pages/user-menu/account-screen", {
        user: req.session.user,
        tasks: res.locals.tasks, // Explicitly pass tasks
    });
});

// Define routes here

module.exports = router;