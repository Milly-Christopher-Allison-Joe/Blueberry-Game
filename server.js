import app from "#app";
import db from "#db/client";
import "dotenv/config";
import usersRouter from "./api/users.js";

const PORT = 3000;

await db.connect();

app.user("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
