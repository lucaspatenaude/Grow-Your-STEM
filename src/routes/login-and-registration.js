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
            "INSERT INTO users (username, password, score) VALUES ($1, $2, DEFAULT) RETURNING userid",
            [req.body.username, hash]
        );

        // Insert the preset tasks for the new user
        const tasks = [
            { id: 1, name: 'Read Article "How Do Tariffs Work"', points: 10, location: '/articles/nathaniel/how-do-tariffs-work' },
            { id: 2, name: 'Read Article "Credit and Financing Options"', points: 25, location: '/articles/lucas/credit-and-financing-options' },
            { id: 3, name: 'Read Article "Retirement Accounts"', points: 30, location: '/articles/clay/retirement-accounts' },
            { id: 4, name: 'Read Article "Global Reserve"', points: 30, location: '/articles/clay/global-reserve' },
            { id: 5, name: 'Click Fundamentals Button', points: 15, location: '/' },
            { id: 6, name: 'Play "Universal Paperclips"', points: 20, location: '/' },
            { id: 7, name: 'Complete STEM Quiz', points: 35, location: '/' },
            { id: 8, name: 'Watch STEM Webinar', points: 40, location: '/' },
            { id: 9, name: 'Submit a STEM Project', points: 50, location: '/' },
            { id: 10, name: 'Join STEM Community Forum', points: 20, location: '/' },
            { id: 11, name: 'Share STEM Article on Social Media', points: 10, location: '/' }
        ];

        const taskQueries = tasks.map(task => {
            return db.none(
                "INSERT INTO tasks (userid, taskid, taskname, points, location) VALUES ($1, $2, $3, $4, $5)",
                [newUser.userid, task.id, task.name, task.points, task.location]
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