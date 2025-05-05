-- Drop tables if they already exist
DROP TABLE IF EXISTS basics;

-- Create the basics table
CREATE TABLE basics (
    BasicID SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Summary TEXT NOT NULL,
    Link VARCHAR(255) NOT NULL,
    ImagePath VARCHAR(255) NOT NULL,
    ImageAlt VARCHAR(255) NOT NULL
);

-- Insert basics into the basics table
INSERT INTO basics (Title, Summary, Link, ImagePath, ImageAlt)
VALUES
    ('Understanding Net Worth', 'Learn how to calculate and understand your net worth.', '/basics/net-worth', '/img/basics/Net-Worth.jpg', 'Understanding Net Worth Image'),
    ('Student Loans and Debt Hierarchies', 'Explore strategies for managing student loans and understanding debt hierarchies.', '/basics/student-loans', '/img/basics/Student-Loans.jpg', 'Student Loans and Debt Hierarchies Image'),
    ('Budgeting That Doesn’t Suck (Seriously)', 'Discover practical budgeting techniques that actually work.', '/basics/budgeting', '/img/basics/Budgeting.jpg', 'Budgeting That Doesn’t Suck Image'),
    ('Emergency Funds: The First $1K and Beyond', 'Learn how to build and maintain an emergency fund.', '/basics/emergency-funds', '/img/basics/Emergency-Funds.jpg', 'Emergency Funds Image'),
    ('Credit Scores and Credit Building', 'Understand credit scores and how to build good credit.', '/basics/credit-scores', '/img/basics/Credit-Scores.jpg', 'Credit Scores and Credit Building Image'),
    ('Intro to Investing', 'Get started with investing and learn the basics.', '/basics/investing', '/img/basics/Investing.jpg', 'Intro to Investing Image'),
    ('Paychecks: What Are All These Deductions?', 'Break down the deductions on your paycheck and understand where your money goes.', '/basics/paychecks', '/img/basics/Paychecks.jpg', 'Understanding Paychecks Image'),
    ('Benefits Beyond Salary', 'Explore the benefits that go beyond your paycheck.', '/basics/benefits', '/img/basics/Benefits.jpg', 'Benefits Beyond Salary Image');

-- Go to '/src/routes/login-and-restrigation.js' under the POST '/register' route to ddd the basics attributes (title, points) for scoring. Due to tasks being assigned at user registration (since grouped by userID), an additional file is needed to link the basics to the users.