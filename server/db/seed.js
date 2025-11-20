import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // INSERT MULTIPLE USERS
  const userResult = await db.query(`
    INSERT INTO users (username, password)
    VALUES 
        ('user1', 'password123'),
        ('user2', 'password123'),
        ('user3', 'password123'),
        ('user4', 'password123'),
        ('user5', 'password123')
    RETURNING id
  `);

  // GET ALL USER IDS
  const userIds = userResult.rows.map((u) => u.id);

  // INSERT SAMPLE BOSS RESULTS
  const bossResult = await db.query(`
    INSERT INTO boss (name, level, base_time)
    VALUES 
        ('Blueberry', 1, '00:20:00'),
        ('Raspberry', 2, '00:25:00'),
        ('Strawberry', 3, '00:30:00'),
        ('Pineapple', 4, '00:35:00'),
        ('Apple', 5, '00:40:00')
    RETURNING id
    `);

  // GET BOSS ID RESULTS
  const bossIds = bossResult.rows.map((b) => b.id);

  // INSERT USER-BOSS COMPLETION TIMES
  await db.query(`
    INSERT INTO users_boss (user_id, boss_id, completion_time)
    VALUES 
      (${userIds[1]}, ${bossIds[2]}, '00:15:32'),
      (${userIds[0]}, ${bossIds[3]}, '00:18:10'),
      (${userIds[3]}, ${bossIds[1]}, '00:22:45'),
      (${userIds[2]}, ${bossIds[4]}, '00:30:01'),
      (${userIds[4]}, ${bossIds[0]}, '00:33:55')
  `);
}
