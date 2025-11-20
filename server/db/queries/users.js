import db from "#db/client";

export async function getUserById(id) {
  const result = await db.query(
    "SELECT id, username FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}
