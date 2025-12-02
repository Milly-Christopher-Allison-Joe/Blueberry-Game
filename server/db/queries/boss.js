import db from "../client.js";

export async function getBossById(id) {
  const sql = `
    SELECT * 
    FROM boss
    WHERE id = $1
    `;
  const {
    rows: [boss],
  } = await db.query(sql, [id]);
  return boss;
}

export async function getAllBosses() {
  const sql = `SELECT id, key, name FROM boss`;
  const { rows } = await db.query(sql);
  return rows;
}
