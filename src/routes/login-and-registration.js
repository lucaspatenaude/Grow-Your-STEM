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
            "INSERT INTO users (username, password, score) VALUES ($1, $2, DEFAULT) RETURNING userid, username, score",
            [req.body.username, hash]
        );

        // Set session data for the new user
        req.session.user = {
            userid: newUser.userid,
            username: newUser.username,
            score: newUser.score
        };

        req.session.save(); // Save the session

        // Separate tasks into categories
        const articleTasks = [
            { id: 1, name: 'Read Article "How Do Tariffs Work"', points: 10, location: '/articles/nathaniel/how-do-tariffs-work' },
            { id: 2, name: 'Read Article "Credit and Financing Options"', points: 25, location: '/articles/lucas/credit-and-financing-options' },
            { id: 3, name: 'Read Article "Retirement Accounts"', points: 30, location: '/articles/Clay/retirement-accounts' },
            { id: 4, name: 'Read Article "Global Reserve"', points: 30, location: '/articles/Clay/global-reserve'},
            { id: 5, name: 'Read Article "What\'s a Negative Price?"', points: 20, location: '/articles/Clay/whats-a-negative-price' },
            { id: 6, name: 'Read Article "Meme Stocks & Cryptocurrency"', points: 20, location: '/articles/Clay/meme-stocks-and-crypto' },
            { id: 7, name: 'Read Article "Future of AI in the Workplace"', points: 20, location: '/articles/lucas/future-of-ai-in-the-workplace' },
            { id: 8, name: 'Read Article "Investment Trends of 2025"', points: 50, location: '/articles/lucas/investment-trends-2025' },
            { id: 9, name: 'Read Article "Dangers of Modern Investment Platforms"', points: 20, location: '/articles/Lucas/dangers-of-modern-investment-platforms' },
            { id: 10, name: 'Read Article "Popularity of Options Trading"', points: 20, location: '/articles/lucas/popularity-of-options-trading' }
        ];

        const basicsTasks = [
            { id: 1, name: 'Understanding Net Worth', points: 10, location: '/basics/net-worth' },
            { id: 2, name: 'Student Loans and Debt Hierarchies', points: 20, location: '/basics/student-loans' },
            { id: 3, name: 'Budgeting That Doesn’t Suck (Seriously)', points: 30, location: '/basics/budgeting' },
            { id: 4, name: 'Emergency Funds: The First $1K and Beyond', points: 15, location: '/basics/emergency-funds' },
            { id: 5, name: 'Credit Scores and Credit Building', points: 25, location: '/basics/credit-scores' },
            { id: 6, name: 'Intro to Investing', points: 35, location: '/basics/investing' },
            { id: 7, name: 'Paychecks: What Are All These Deductions?', points: 20, location: '/basics/paychecks' },
            { id: 8, name: 'Benefits Beyond Salary', points: 30, location: '/basics/benefits' }
        ];

        const lessonTasks = [
            { id: 1, name: 'Click Fundamentals Button', points: 15, location: '/' },
            { id: 2, name: 'Complete STEM Quiz', points: 35, location: '/' },
            { id: 3, name: 'Watch STEM Webinar', points: 40, location: '/' }
        ];

        const gameTasks = [
            { id: 1, name: 'Play "Universal Paperclips"', points: 20, location: '/' },
            { id: 2, name: 'Submit a STEM Project', points: 50, location: '/' },
            { id: 3, name: 'Join STEM Community Forum', points: 20, location: '/' },
            { id: 4, name: 'Share STEM Article on Social Media', points: 10, location: '/' }
        ];

        // Insert articles into the articleTasks table
        const articleTaskQueries = articleTasks.map(articleTask => {
            return db.none(
                "INSERT INTO articleTasks (userid, articletaskid, taskname, points, location) VALUES ($1, $2, $3, $4, $5)",
                [newUser.userid, articleTask.id, articleTask.name, articleTask.points, articleTask.location]
            );
        });

        // Insert basics into the basicsTasks table
        const basicsTaskQueries = basicsTasks.map(basicsTask => {
            return db.none(
                "INSERT INTO basicsTasks (userid, basictaskid, taskname, points, location) VALUES ($1, $2, $3, $4, $5)",
                [newUser.userid, basicsTask.id, basicsTask.name, basicsTask.points, basicsTask.location]
            );
        });

        // Insert lessons into the lessonTasks table
        const lessonTaskQueries = lessonTasks.map(lessonTask => {
            return db.none(
                "INSERT INTO lessonTasks (userid, lessontaskid, taskname, points, location) VALUES ($1, $2, $3, $4, $5)",
                [newUser.userid, lessonTask.id, lessonTask.name, lessonTask.points, lessonTask.location]
            );
        });

        // Insert games into the gameTasks table
        const gameTaskQueries = gameTasks.map(gameTask => {
            return db.none(
                "INSERT INTO gameTasks (userid, gametaskid, taskname, points, location) VALUES ($1, $2, $3, $4, $5)",
                [newUser.userid, gameTask.id, gameTask.name, gameTask.points, gameTask.location]
            );
        });

        // Execute all queries
        await Promise.all([...articleTaskQueries, ...basicsTaskQueries, ...lessonTaskQueries, ...gameTaskQueries]);

        // Redirect to the home page after successful registration and login
        res.redirect("/home");
    } catch (error) {
        console.error("Error during registration:", error.message || error);
        res.render("pages/home", { message: "An error occurred during registration", error: true, showRegister: true });
    }
});

module.exports = router;