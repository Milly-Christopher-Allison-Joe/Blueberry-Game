import db from "#db/client";

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
