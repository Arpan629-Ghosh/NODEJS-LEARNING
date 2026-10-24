-- null --> unknown or missing value
-- empty string -- known string val but contain no characters
-- zero --> actual numeric value

DROP TABLE IF EXISTS basics.value_examples;

CREATE TABLE basics.value_examples (
    id SERIAL PRIMARY KEY,
    nickname TEXT,
    bio TEXT,
    score INTEGER
);

INSERT INTO basics.value_examples (nickname, bio, score)
VALUES
    (null, 'learning postgresql', 10),
    ('', 'empty nickname', 20),
    ('Arpan', '', 0),
    ('John', null, null);

SELECT * FROM basics.value_examples;

SELECT * FROM basics.value_examples
WHERE nickname IS NULL;

SELECT * FROM basics.value_examples 
WHERE nickname = '';

SELECT * FROM basics.value_examples 
WHERE score = 0;

SELECT * FROM basics.value_examples
WHERE nickname IS NOT NULL;