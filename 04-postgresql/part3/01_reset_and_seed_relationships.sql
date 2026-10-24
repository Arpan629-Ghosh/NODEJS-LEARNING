
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

CREATE TABLE posts(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id),

    title TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'draft'
           CHECK (status IN ('draft', 'published')),
    
    views INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0)
);

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    post_id UUID NOT NULL REFERENCES posts(id),

    body TEXT NOT NULL
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE
);

CREATE TABLE post_tags (
    post_id UUID NOT NULL REFERENCES posts(id),
    tag_id UUID NOT NULL REFERENCES tags(id),

    PRIMARY KEY(post_id, tag_id)
);


-- 1. USERS
INSERT INTO users (name)
VALUES
    ('Arpan Ghosh'),
    ('Arpita Jana'),
    ('Rahul Mehta'),
    ('Sneha Patel'),
    ('Amit Das');


-- 2. POSTS
-- Each post belongs to an existing user.
INSERT INTO posts (user_id, title, status, views)
VALUES
    (
        (SELECT id FROM users WHERE name = 'Arpan Ghosh'),
        'Getting Started with PostgreSQL',
        'published',
        250
    ),
    (
        (SELECT id FROM users WHERE name = 'Arpita Jana'),
        'Understanding Database Relationships',
        'published',
        180
    ),
    (
        (SELECT id FROM users WHERE name = 'Rahul Mehta'),
        'Learning SQL Joins',
        'draft',
        0
    ),
    (
        (SELECT id FROM users WHERE name = 'Sneha Patel'),
        'PostgreSQL Performance Tips',
        'published',
        420
    ),
    (
        (SELECT id FROM users WHERE name = 'Amit Das'),
        'Introduction to Database Indexes',
        'draft',
        0
    );


-- 3. COMMENTS
-- Each comment belongs to an existing post.
INSERT INTO comments (post_id, body)
VALUES
    (
        (SELECT id FROM posts
         WHERE title = 'Getting Started with PostgreSQL'),
        'Very helpful introduction!'
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'Getting Started with PostgreSQL'),
        'Could you explain indexes next?'
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'Understanding Database Relationships'),
        'The examples made relationships easy to understand.'
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'Learning SQL Joins'),
        'Looking forward to the published version.'
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'PostgreSQL Performance Tips'),
        'These optimization tips saved me a lot of time.'
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'PostgreSQL Performance Tips'),
        'Please share more advanced examples.'
    );


-- 4. TAGS
INSERT INTO tags (name)
VALUES
    ('PostgreSQL'),
    ('SQL'),
    ('Database'),
    ('Performance'),
    ('Beginner'),
    ('Tutorial');


-- 5. POST_TAGS
-- Connect posts with tags (many-to-many relationship).
INSERT INTO post_tags (post_id, tag_id)
VALUES
    (
        (SELECT id FROM posts
         WHERE title = 'Getting Started with PostgreSQL'),
        (SELECT id FROM tags WHERE name = 'PostgreSQL')
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'Getting Started with PostgreSQL'),
        (SELECT id FROM tags WHERE name = 'Beginner')
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'Getting Started with PostgreSQL'),
        (SELECT id FROM tags WHERE name = 'Tutorial')
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'Understanding Database Relationships'),
        (SELECT id FROM tags WHERE name = 'Database')
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'Understanding Database Relationships'),
        (SELECT id FROM tags WHERE name = 'SQL')
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'Learning SQL Joins'),
        (SELECT id FROM tags WHERE name = 'SQL')
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'Learning SQL Joins'),
        (SELECT id FROM tags WHERE name = 'Beginner')
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'PostgreSQL Performance Tips'),
        (SELECT id FROM tags WHERE name = 'PostgreSQL')
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'PostgreSQL Performance Tips'),
        (SELECT id FROM tags WHERE name = 'Performance')
    ),
    (
        (SELECT id FROM posts
         WHERE title = 'Introduction to Database Indexes'),
        (SELECT id FROM tags WHERE name = 'Database')
    );

