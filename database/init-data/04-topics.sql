DROP TABLE IF EXISTS topics;

-- Create the topics table
CREATE TABLE topics (
    TopicID SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Summary TEXT NOT NULL,
    Link VARCHAR(255) NOT NULL
);

-- Insert topics
INSERT INTO topics (Title, Summary, Link)
VALUES
    ('US Economy Dashboard', 'View a dashboard view of the US economy', 'https://finviz.com');
