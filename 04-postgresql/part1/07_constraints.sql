 

 DROP TABLE basics.accounts;

 CREATE TABLE basics.accounts(
    id SERIAL PRIMARY KEY,

    full_name TEXT NOT NULL,

    email TEXT NOT NULL UNIQUE,

    is_active BOOLEAN DEFAULT true,

    age INTEGER CHECk (age >= 18),

    created_at TIMESTAMP DEFAULT NOW()
 );

 INSERT INTO basics.accounts (full_name, email, is_active, age)
 VALUES ('arpan ghosh', 'arpan@gmail.com', true, 21);

 SELECT * FROM basics.accounts;

 