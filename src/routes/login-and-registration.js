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
            { id: 1, name: 'Read Article "How Do Tariffs Work"', points: 30, location: '/articles/nathaniel/how-do-tariffs-work' },
            { id: 2, name: 'Read Article "Credit and Financing Options"', points: 20, location: '/articles/lucas/credit-and-financing-options' },
            { id: 3, name: 'Read Article "Retirement Accounts"', points: 20, location: '/articles/Clay/retirement-accounts' },
            { id: 4, name: 'Read Article "Global Reserve"', points: 25, location: '/articles/Clay/global-reserve'},
            { id: 5, name: 'Read Article "What\'s a Negative Price?"', points: 20, location: '/articles/Clay/whats-a-negative-price' },
            { id: 6, name: 'Read Article "Why You Should Care About Crypto Currency!"', points: 40, location: '/articles/Clay/crypto' },
            { id: 7, name: 'Read Article "Future of AI in the Workplace"', points: 40, location: '/articles/lucas/future-of-ai-in-the-workplace' },
            { id: 8, name: 'Read Article "Investment Trends of 2025"', points: 25, location: '/articles/lucas/investment-trends-2025' },
            { id: 9, name: 'Read Article "Dangers of Modern Investment Platforms"', points: 30, location: '/articles/Lucas/dangers-of-modern-investment-platforms' },
            { id: 10, name: 'Read Article "Popularity of Options Trading"', points: 25, location: '/articles/lucas/popularity-of-options-trading' },
            { id: 11, name: 'Read Article "Why are Tech Stocks Falling"', points: 20, location: '/articles/nathaniel/tech-stocks' }
            { id: 12, name: 'Read Article "Eggs and Milk"', points: 20, location: '/articles/nathaniel/cost-of-living' }
        ];

        const basicsTasks = [
            { id: 1, name: 'Read "Understanding Net Worth" Basic', points: 10, location: '/basics/net-worth' },
            { id: 2, name: 'Read "Student Loans" Basic', points: 25, location: '/basics/student-loans' },
            { id: 3, name: 'Read "Budgeting Like an Adult" Basic', points: 10, location: '/basics/budgeting' },
            { id: 4, name: 'Read "Insurance 101" Basic', points: 20, location: '/basics/insurance' },
            { id: 5, name: 'Read "Credit Scores and Credit Building" Basic', points: 10, location: '/basics/credit-scores' },
            { id: 6, name: 'Read "Intro to Investing" Basic', points: 5, location: '/basics/investing' },
            { id: 7, name: 'Read "Paychecks: What Are All These Deductions?" Basic', points: 20, location: '/basics/paychecks' },
            { id: 8, name: 'Read "Employment Benefits Beyond Salary" Basic', points: 10, location: '/basics/benefits' }
            { id: 9, name: 'Read "Growing Your Tree" Basic', points: 10, location: '/basics/your-tree' }
        ];

        const topicTasks = [
            { id: 1, name: 'Click "US Economy Dashboard" button', points: 10, location: '/basics#topics-container' },
            { id: 2, name: 'Click "US Debt Clock button', points: 15, location: '/basics#topics-container' }
        ];

        const gameTasks = [
            { id: 1, name: 'Play "Universal Paperclips"', points: 25, location: '/games#universal-paperclips-container' },
            { id: 2, name: 'Play "Investopedia Simulator"', points: 25, location: '/games#investopedia-simulator-container' },
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

        // Insert topics into the topicTasks table
        const topicTaskQueries = topicTasks.map(topicTask => {
            return db.none(
                "INSERT INTO topicTasks (userid, topictaskid, taskname, points, location) VALUES ($1, $2, $3, $4, $5)",
                [newUser.userid, topicTask.id, topicTask.name, topicTask.points, topicTask.location]
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
        await Promise.all([...articleTaskQueries, ...basicsTaskQueries, ...topicTaskQueries, ...gameTaskQueries]);

        // Redirect to the home page after successful registration and login
        res.redirect("/home");
    } catch (error) {
        console.error("Error during registration:", error.message || error);
        res.render("pages/home", { message: "An error occurred during registration", error: true, showRegister: true });
    }
});

module.exports = router;