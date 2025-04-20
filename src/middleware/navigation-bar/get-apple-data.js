const axios = require("axios");

// Middleware function to fetch Apple stock data
const fetchAppleData = async (req, res, next) => {
    try {
        // Make GET request to the API endpoint
        const response = await axios.get(
            `https://api.twelvedata.com/time_series?interval=1min&timezone=America/Denver&dp=3&format=JSON&type=stock&symbol=AAPL`,
            {
                params: {
                    "apikey": "d65749af0c9b4f7ba3dfa6f2498a035c", // Add your API key here
                },
            }
        );

        // Log the API response for debugging
        console.log("API Response:", response.data);

        // Check if meta and values exist in the response
        if (!response.data.meta || !response.data.values) {
            throw new Error("Invalid API response structure");
        }

        // Extract relevant data from the API response
        const { meta, values } = response.data;

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
        };

        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error("Error fetching Apple data:", error.message);
        res.locals.appleData = null; // Set to null if there's an error
        next(); // Call the next middleware or route handler
    }
};

module.exports = fetchAppleData;