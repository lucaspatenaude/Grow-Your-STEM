DROP TABLE IF EXISTS topics;

-- Create the topics table
CREATE TABLE topics (
    TopicID SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Summary TEXT NOT NULL,
    Link VARCHAR(255) NOT NULL,
    ButtonText VARCHAR(255) NOT NULL
);

-- Insert topics
INSERT INTO topics (Title, Summary, Link, ButtonText)
VALUES
    ('US Economy Dashboard', 'View a dashboard view of the US economy', 'https://finviz.com', 'Open Dashboard'),
    ('US Debt Clock', 'View the US debt accumulating in real-time', 'https://www.usdebtclock.org, "Open Debt Clock');

-- Go to '/src/routes/login-and-restrigation.js' under the POST '/register' route to ddd the topics attributes (title, points). Due to the scoring system, they are not added to the database at this time.