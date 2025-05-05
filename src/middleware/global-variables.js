// filepath: /Users/lucas/Developer/Grow-Your-STEM/src/middleware/global-variables.js
module.exports = (req, res, next) => {
    res.locals.user = req.session.user || null; // Pass user from session
    res.locals.articles = res.locals.articles || []; // Pass articles
    res.locals.topics = res.locals.topics || []; // Pass topics
    res.locals.games = res.locals.games || []; // Pass games
    next();
};