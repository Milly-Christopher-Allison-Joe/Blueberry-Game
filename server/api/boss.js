import { Router } from "express";
import { getAllBosses } from "../db/queries/boss.js";

const router = Router();

router.get("/", async (req, res) => {
  const bosses = await getAllBosses();
  res.json(bosses);
});

export default router;
