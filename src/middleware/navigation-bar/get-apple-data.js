const axios = require("axios");

// Middleware function to fetch clubs data
const fetchAppleData = async (req, res, next) => {
	try {

		// Make GET request to the API endpoint using the club ID
		const response = await axios.get(
			`https://api.twelvedata.com/time_series?interval=1min&timezone=America/Denver&dp=3&format=JSON&type=stock&symbol=AAPL`,
			{
				headers: {
					"X-Auth-Token": "d65749af0c9b4f7ba3dfa6f2498a035c", // Add your API key here
				},
			}
		);

		// Extract relevant data from the API response
		const appleData = response.data;
		// res.locals.user = users
		// Attach the data to res.locals
		res.locals.appleData = {
			meta: {
					symbol: meta.symbol,
					interval: meta.interval,
					currency: meta.currency,
					exchange: meta.exchange,
					timezone: meta.exchange_timezone,
			},
			latestValues: values.slice(0, 5), // Get the latest 5 data points
	}

		next(); // Call next middleware or route handler
	}
	// Handle errors
	catch (error) {
		console.error("Error fetching clubs data:", error);
		res.locals.club = null; // Set to null if there's an error
		next(); // Call next middleware or route handler
	}
};

module.exports = fetchClubsData;