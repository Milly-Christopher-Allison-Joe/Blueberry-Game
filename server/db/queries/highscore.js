const db = require("../client");

// This inserts or updates users best time
export async function getUserBossScore(userId, bossId, newTime) {
  await db.query(
    `INSERT INTO user_boss_scores (user_id, boss_is, best_time)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, boss_id)
        DO UPDATE SET best_time = LEAST(user_boss_scores.best_time, EXCLUDED.best_time),
            updated_at = CURRENT_TIMESTAMP`,
    [userId, bossId, newTime]
  );
}

export async function getAllUserScores(userId) {
  const result = await db.query(
    `SELECT boss_id, best_time FROM user_boss_scores WHERE user_id = $1`,
    [userId]
  );
  return result.rows;
}
