const express = require("express");
const router = express.Router();

// Insert routes here
// Render home page for /home route
router.get("/home", (req, res) => {
    res.render("pages/home");
});

router.get("/", (req, res) => {
    res.redirect("/home");
});

module.exports = router;
