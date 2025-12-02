import "dotenv/config";
console.log("DATABASE_URL:", process.env.DATABASE_URL);

import app from "./app.js";
import db from "./server/db/client.js";
import "dotenv/config";
import usersRouter from "./server/api/users.js";
import bossesRouter from "./server/api/boss.js";
import highscoreRouter from "./server/api/highscore.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

await db.connect();

app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.use("/api/users", usersRouter);
app.use("/api/bosses", bossesRouter);
app.use("/api/highscore", highscoreRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
