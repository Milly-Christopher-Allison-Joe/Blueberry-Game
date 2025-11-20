import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "#db/client";

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("Register body:", req.body);

  // IF USERNAME OR PASSWORD IS MISSING
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const result = await db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username`,
      [username, hashedPassword]
    );
    console.log("Query result:", result.rows);

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // IF USERNAME OR PASSWORD IS MISSING
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  try {
    const result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    const user = result.rows[0];

    // USER NOT FOUND
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // LOGIC: PASSWORD MATCH
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
