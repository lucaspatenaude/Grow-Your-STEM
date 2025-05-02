// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require("express"); // To build an application server or API
const app = express();
const handlebars = require("express-handlebars");
const Handlebars = require("handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session"); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require("bcryptjs"); //  To hash passwords
const axios = require("axios"); // To make HTTP requests from our server. We'll learn more about it in Part C.
const moment = require("moment"); // To extract current time data

// *****************************************************
// <!-- 2. Start the Database -->
// *****************************************************

const db = require("../database/setup"); // Import the db module

// *****************************************************
// <!-- 3. Setup Handlebars and Static Directories -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
	extname: "hbs",
	layoutsDir: __dirname + "/../public/views/layouts",
	partialsDir: __dirname + "/../public/views/partials",
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/../public/views")); // Set the views directory for Handlebars
app.use(bodyParser.json());

// Serve static files from the 'Assets" directory
app.use(express.static(path.join(__dirname, "/../public/assets")));

// *****************************************************
// <!-- 4. Initialize User Sessions -->
// *****************************************************

// initialize session variables
app.get("/welcome", (req, res) => {
	res.json({ status: "success", message: "Welcome!" });
});
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
	})
);

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	const user = req.session.user || null; // Get the user from the session
	res.render("pages/home", { user }); // Pass the user object to the template
});

// Middleware to set user in res.locals
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Set user to null if not logged in
    next();
});

// Middleware to fetch tasks
app.use(async (req, res, next) => {
    if (req.session.user) {
        try {
            const tasks = await db.query(
                'SELECT TaskID, TaskName, Points, IsCompleted FROM tasks WHERE UserID = $1 ORDER BY TaskID',
                [req.session.user.userid]
            );
            console.log('Fetched tasks:', tasks); // This will now log correctly
            res.locals.tasks = tasks;
        } catch (error) {
            console.error('Error fetching tasks:', error.message || error);
            res.locals.tasks = [];
        }
    } else {
        res.locals.tasks = [];
    }
    next();
});

// *****************************************************
// <!-- 5. Append All Middleware -->
// *****************************************************

app.use('/middleware', express.static(path.join(__dirname, '/middleware'))); // Serve static files from the 'middleware' directory

// Route for /account
app.get("/account", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login"); // Redirect to login if user is not logged in
    }
    res.render("partials/pages/user-menu/account-screen", {
        user: req.session.user,
        tasks: res.locals.tasks, // Explicitly pass tasks
    });
});

// *****************************************************
// <!-- 6. Output All Page Routes -->
// *****************************************************

app.use("/", require("./routes/routes")); // Import all routes from the routes directory
app.use("/", require("./routes/login-and-registration")); // Import all routes from the login-and-registration directory
app.use("/", require("./routes/tasks")); // Import all routes from the tasks directory
app.use("/", require("./routes/account")); // Import all routes from the account directory

// *****************************************************
// <!-- 7. Export the App Object -->
// *****************************************************

// Export the app object to index.js
module.exports = app;