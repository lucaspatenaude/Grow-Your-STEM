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
const fetchTasks = require('./middleware/database/fetch-tasks'); // Import the fetchTasks middleware
const fetchArticles = require('./middleware/database/fetch-articles'); // Import the fetchArticles middleware
const fetchBasics = require('./middleware/database/fetch-basics'); // Import the fetchBasics middleware
const fetchTopics = require('./middleware/database/fetch-topics'); // Import the fetchBasics middleware

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

app.use('/middleware', express.static(path.join(__dirname, '/middleware'))); // Serve static files from the 'middleware' directory

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

// Middleware to set user in res.locals
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Set user to null if not logged in
    next();
});

// *****************************************************
// <!-- 5. Append All Middleware -->
// *****************************************************

app.use(fetchArticles); // Middleware to fetch articles for the logged-in user
app.use (fetchBasics); // Middleware to fetch basics for all pages
app.use (fetchTopics); // Middleware to fetch basics for all pages
app.use(fetchTasks); // Middleware to fetch tasks for the logged-in user

// *****************************************************
// <!-- 6. Output All Page Routes -->
// *****************************************************

app.use("/", require("./routes/routes")); // Use the consolidated routes file

// *****************************************************
// <!-- 7. Export the App Object -->
// *****************************************************

// Export the app object to index.js
module.exports = app;