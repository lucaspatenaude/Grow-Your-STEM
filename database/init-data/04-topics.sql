DROP TABLE IF EXISTS topics;

-- Create the topics table
CREATE TABLE topics (
    TopicID SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Summary TEXT NOT NULL,
    Link VARCHAR(255) NOT NULL,
    ButtonText VARCHAR(255) NOT NULL
);

-- Insert topics into the topics table
INSERT INTO topics (Title, Summary, Link, ButtonText)
VALUES
    ('US Economy Dashboard', 'View a dashboard view of the US economy', 'https://finviz.com', 'Open Dashboard'),
    ('US Debt Clock', 'View the US debt accumulating in real-time', 'https://www.usdebtclock.org', 'Open Debt Clock');

-- Go to '/src/routes/login-and-restrigation.js' under the POST '/register' route to ddd the topic attributes (title, points) for scoring. Due to tasks being assigned at user registration (since grouped by userID), an additional file is needed to link the topics to the users.