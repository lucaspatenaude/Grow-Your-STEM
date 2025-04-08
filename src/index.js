// Import the 'app' object from app.js
const app = require("./app.js");

// Start the server using the 'app' object
const server = app.listen(3000, () => {
	console.log("Server is listening on port 3002");
});

// Export the server for potential later use
module.exports = server;
