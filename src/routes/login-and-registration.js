const express = require("express");
const router = express.Router();
const db = require("../../database/setup"); // Import the database connection
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

// ************************** 
//     Login Page Routes
// **************************

// Trigger login form to check database for matching username and password
router.post("/login", async (req, res) => {
    try {
        const user = await db.oneOrNone(
            "SELECT * FROM users WHERE username = $1",
            req.body.username
        );

        if (!user) {
            return res.render("pages/home", { message: "User not found", error: true });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.render("pages/home", { message: "Password does not match", error: true });
        }

        req.session.user = user;
        req.session.save();
        res.redirect("/");
    } catch (error) {
        res.render("pages/home", { message: "An error occurred", error: true });
    }
});

// ************************** 
//     Logout Page Routes
// **************************

router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error("Error destroying session:", err);
			res.status(500).send("Internal Server Error");
		} else {
			// Redirect to the same page after destroying the session
			res.redirect("/"); // You can change '/' to the desired page if it's not the home page
		}
	});
});

// ************************** 
//  Registration Page Routes
// **************************

// Trigger Registration Form to Post
router.post("/register", async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.render("pages/home", { message: "Invalid input", error: true, showRegister: true });
        }

        // Check if the username already exists
        const existingUser = await db.oneOrNone(
            "SELECT * FROM users WHERE username = $1",
            req.body.username
        );
        if (existingUser) {
            return res.render("pages/home", { message: "Username already exists", error: true, showRegister: true });
        }

        // Hash the password
        const hash = await bcrypt.hash(req.body.password, 10);

        // Insert the new user into the database
        const newUser = await db.one(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING userid",
            [req.body.username, hash]
        );

        // Insert the preset tasks for the new user
        const tasks = [
            'Read Article "How Do Tariffs Work"',
            'Read Article "Credit and Financing Options"',
            'Read Article "Retirement Accounts"',
            'Click Fundamentals Button',
            'Play "Universal Paperclips"',
            'Complete STEM Quiz',
            'Watch STEM Webinar',
            'Submit a STEM Project',
            'Join STEM Community Forum',
            'Share STEM Article on Social Media'
        ];

        const taskQueries = tasks.map(taskName => {
            return db.none(
                "INSERT INTO tasks (userid, taskname, points) VALUES ($1, $2, $3)",
                [newUser.userid, taskName, 10] // Assuming each task is worth 10 points
            );
        });

        await Promise.all(taskQueries);

        // Redirect to the home page after successful registration
        res.redirect("/home");
    } catch (error) {
        console.error("Error during registration:", error.message || error);
        res.render("pages/home", { message: "An error occurred during registration", error: true, showRegister: true });
    }
});

module.exports = router;