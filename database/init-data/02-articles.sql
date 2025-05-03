CREATE TABLE authors (
    AuthorID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE articles (
    ArticleID SERIAL PRIMARY KEY,
    AuthorID INT NOT NULL REFERENCES authors(AuthorID) ON DELETE CASCADE,
    Title VARCHAR(255) NOT NULL,
    Summary TEXT NOT NULL,
    Link VARCHAR(255) NOT NULL,
    ImagePath VARCHAR(255) NOT NULL,
    ImageAlt VARCHAR(255) NOT NULL
);

-- Insert authors
INSERT INTO authors (Name)
VALUES
    ('Nathaniel Beatty'),
    ('Lucas Patenaude'),
    ('Clay Kress');

-- Insert articles
INSERT INTO articles (AuthorID, Title, Summary, Link, ImagePath, ImageAlt)
VALUES
    (1, 'How do Tariffs Work?', 'An in-depth analysis on what the effects of current-day tariffs look like', '/articles/nathaniel/how-do-tariffs-work', '/img/articles/Nathaniel/How-Do-Tariffs-Work.webp', 'Sample Event Image'),
    (2, 'Credit and Financing Options', 'Navigating funding and credit options for education can be daunting. This article explores popular options for STEM majors', '/articles/lucas/credit-and-financing-options', '/img/articles/Lucas/Credit-and-Finance-Options.jpeg', 'Sample Event Image'),
    (3, 'Retirement Accounts: How Do They Work?', 'Saving money at a young age can seem daunting but the benefits are far reaching', '/articles/clay/retirement-accounts', '/img/articles/Clay/Retirement-Accounts.jpg', 'Sample Event Image'),
    (3, 'The US Dollar as the Global Reserve Currency.', 'The United States holds a lot of power as the nation behind the global reserve currency, but what does it mean for us? What happens if we lose it?', '/articles/Clay/global-reserve', '/img/articles/Clay/Retirement-Accounts.jpg', 'Sample Event Image'),
    (2, 'The Future of AI in the Workplace', 'An in-depth analysis on what the effects of current-day tariffs look like', '/articles/nathaniel/the-future-of-ai-in-the-workplace', '/img/articles/Nathaniel/The-Future-of-AI-in-the-Workplace.webp', 'Sample Event Image');