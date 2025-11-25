import { Router } from "express";
import {
  upsertUserBossScore,
  getUserBossScore,
} from "../db/queries/highscore.js";
import getUserFromToken from "../middleware/getUserFromToken.js";
import requireUser from "../middleware/requireUser.js";

const router = Router();

// This is the route for upserting users completion time
// Set so scores only post to profile if user is logged in
router.post("/", getUserFromToken, requireUser, async (req, res) => {
  try {
    const { userId, bossId, time } = req.body;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }
    if (!userId || !bossId || typeof time !== "number") {
      return res.status(400).json({ error: "Missing or invalid data" });
    }

    await upsertUserBossScore(userId, bossId, time);
    const bestTime = await getUserBossScore(userId, bossId);

    res.json({ userId, bossId, bestTime });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
