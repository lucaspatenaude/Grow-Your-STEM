-- Create table to hold user accounts
CREATE TABLE users (
    UserID SERIAL PRIMARY KEY, -- Unique identifier for each user to link as foreign key in other tables
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password CHAR(60) NOT NULL,
    Score INT DEFAULT 0 NOT NULL
);
