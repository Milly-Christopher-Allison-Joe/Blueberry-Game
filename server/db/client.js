import pg from "pg";
const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DEV === "true"
      ? undefined
      : {
          rejectUnauthorized: false,
        },
});
export default db;
