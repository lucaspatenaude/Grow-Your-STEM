const express = require("express");
const router = express.Router();

// ******** Basics Routes ********

// Route for "Understanding Net Worth"
router.get("/basics/net-worth", (req, res) => {
    res.render("pages/basics/Net-Worth");
});

// Route for "Student Loans and Debt Hierarchies"
router.get("/basics/student-loans", (req, res) => {
    res.render("pages/basics/Student-Loans");
});

// Route for "Budgeting That Doesn’t Suck (Seriously)"
router.get("/basics/budgeting", (req, res) => {
    res.render("pages/basics/Budgeting");
});

// Route for "Emergency Funds: The First $1K and Beyond"
router.get("/basics/insurance", (req, res) => {
    res.render("pages/basics/Insurance");
});

// Route for "Credit Scores and Credit Building"
router.get("/basics/credit-scores", (req, res) => {
    res.render("pages/basics/Credit-Scores");
});

// Route for "Intro to Investing"
router.get("/basics/investing", (req, res) => {
    res.render("pages/basics/Investing");
});

// Route for "Paychecks: What Are All These Deductions?"
router.get("/basics/paychecks", (req, res) => {
    res.render("pages/basics/Paychecks");
});

// Route for "Benefits Beyond Salary"
router.get("/basics/benefits", (req, res) => {
    res.render("pages/basics/Benefits");
});

// Route for "Your Tree"
router.get("/basics/your-tree", (req, res) => {
    res.render("pages/basics/Your-Tree");
});

module.exports = router;