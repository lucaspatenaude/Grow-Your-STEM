require("dotenv").config(); // Ensure environment variables are loaded

// Import the 'app' object from app.js
const app = require("./app.js");

// Start the server using the 'app' object
const server = app.listen(3000, () => {
    console.log(`Server is listening on port ${process.env.NODE_PORT}`);
});

// Export the server for potential later use
module.exports = server;
