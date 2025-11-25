import db from "../client.js";

// This gets users best time for specific boss
export async function getUserBossScore(userId, bossId) {
  const result = await db.query(
    `SELECT best_time FROM user_boss_scores WHERE user_id = $1 AND boss_id = $2`,
    [userId, bossId]
  );
  return result.rows[0]?.best_time || null;
}

// Insert or update a user's best time for specific boss
export async function upsertUserBossScore(userId, bossId, newTime) {
  await db.query(
    `INSERT INTO user_boss_scores (user_id, boss_id, best_time)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, boss_id)
     DO UPDATE SET best_time = LEAST(user_boss_scores.best_time, EXCLUDED.best_time),
                   updated_at = CURRENT_TIMESTAMP`,
    [userId, bossId, newTime]
  );
}

// Get all best times for a user
export async function getAllUserScores(userId) {
  const result = await db.query(
    `SELECT boss_id, best_time FROM user_boss_scores WHERE user_id = $1`,
    [userId]
  );
  return result.rows;
}
