import { env } from "../config/env";
import { Pool } from "pg";
// pg is a client library for node.js - It allows you to connect to a PostgreSQL database and execute SQL queries from your Node.js application.

// Pool is a class provided by the pg library that allows you to create a pool of database connections. A connection pool is a cache of database connections that can be reused, which improves performance and resource utilization.

export const pool = new Pool({
    connectionString: env.databaseUrl,
}) // new Pool() creates a new instance of the Pool class, which manages a pool of database connections. The connectionString option is set to the value of env.databaseUrl, which is the URL of the PostgreSQL database that you want to connect to.