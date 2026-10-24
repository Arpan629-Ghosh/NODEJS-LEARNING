

DROP DATABASE IF EXIST postgresql_part1; -- not a production approach(never do it in prod app, only for learning)

-- create new db inside postgres server
CREATE DATABASE postgresql_part1;

-- "psql -U postgres -d postgres -f part1/01_first_database.sql" is used to execute SQL commands stored in a .sql file against a PostgreSQL database from your terminal.

--psql: Starts the PostgreSQL command-line client. It allows you to connect to a database and execute SQL queries.

---U postgres: Tells PostgreSQL to connect using the database user named postgres.

-- -d postgres: Selects the database named postgres for the connection.

-- -f part1/01_first_database.sql: Executes the SQL statements in the file located at part1/01_first_database.sql, relative to your current terminal directory.