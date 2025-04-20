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

// Export the app object to index.js
module.exports = app;

// *****************************************************
// <!-- Section 2 : Serve Folders as Static Directories -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
	extname: "hbs",
	layoutsDir: __dirname + "/../public/views/layouts",
	partialsDir: __dirname + "/../public/views/partials",
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "/../public/assets")));

// Serve static files from the 'middleware' directory
app.use('/middleware', express.static(path.join(__dirname, '/middleware')));

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/../public/views"));
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

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



// *****************************************************
// <!-- Section 4 : Middleware -->
// *****************************************************

// *****************************************************
// <!-- Section 5 : API Routes -->
// *****************************************************

// Use the routes
app.use("/", require("./routes/routes"));

// ************************ 
//    Login Page Routes
// *************************




