import "dotenv/config";
import db from "./client.js";
import bcrypt from "bcrypt";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // INSERT MULTIPLE USERS WITH HASHED PASSWORDS
  const password = await bcrypt.hash("password123", 10);
  const userResult = await db.query(
    `
    INSERT INTO users (username, password)
    VALUES 
        ('user1', $1),
        ('user2', $1),
        ('user3', $1),
        ('user4', $1),
        ('user5', $1)
    RETURNING id
  `,
    [password]
  );

  // GET ALL USER IDS
  const userIds = userResult.rows.map((u) => u.id);

  // INSERT SAMPLE BOSSES (add 'key' column)
  const bossResult = await db.query(`
    INSERT INTO boss (key, name, level, base_time)
    VALUES 
        ('blueberry', 'Blueberry', 1, '00:20:00'),
        ('raspberry', 'Raspberry', 2, '00:25:00'),
        ('strawberry', 'Strawberry', 3, '00:30:00'),
        ('pineapple', 'Pineapple', 4, '00:35:00'),
        ('apple', 'Apple', 5, '00:40:00')
    RETURNING id
  `);

  // GET BOSS ID RESULTS
  const bossIds = bossResult.rows.map((b) => b.id);

  // INSERT USER-BOSS BEST TIMES
  await db.query(
    `
    INSERT INTO user_boss_scores (user_id, boss_id, best_time)
    VALUES 
      ($1, $2, 932),
      ($3, $4, 1090),
      ($5, $6, 1365),
      ($7, $8, 1801),
      ($9, $10, 2035)
  `,
    [
      userIds[1],
      bossIds[2],
      userIds[0],
      bossIds[3],
      userIds[3],
      bossIds[1],
      userIds[2],
      bossIds[4],
      userIds[4],
      bossIds[0],
    ]
  );
}
