

DROP TABLE IF EXISTS basics.students;

CREATE TABLE basics.students(

    id SERIAL PRIMARY KEY, -- serial is create auto incrementing integers
    name TEXT NOT NULL, -- not null means this field is required
    email TEXT NOT NULL UNIQUE, -- Unique means no two students have the same email
    age INTEGER CHECk (age >= 18),

    created_at TIMESTAMP DEFAULT NOW() -- Timestamp store the time format, default means the date will be by default assigned
);

-- 'psql -U postgres -d postgresql_part1': connects you to the postgresql_part1 database using the PostgreSQL user postgres and opens an interactive SQL terminal.

INSERT INTO basics.students (name, email, age)
        VALUES('ARPAN', 'arpan@gmail.com', 21),
              ('RAHUL', 'rahul@gmail.com', 21);

SELECT * FROM basics.students;