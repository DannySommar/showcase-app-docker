import { pool } from "./index.js";
import { posts } from "./data.js";

export async function seedTables() {
  const client = await pool.connect()
  try {
    const existingUsers = await client.query(`SELECT id FROM users WHERE username = 'G-man' LIMIT 1`)
    
    let userId;
    if (existingUsers.rows.length === 0) {

      const userResult = await client.query(
        `
        INSERT INTO users (name, email, username, password)
        VALUES ('Skibidi Toilet', 'skibidi@toilet.com', 'G-man', 'urinal123')
        RETURNING id
        `
      )
      userId = userResult.rows[0].id
    } else {
      userId = existingUsers.rows[0].id
    }

    await client.query('DELETE FROM posts')

    for (const post of posts) {
      await client.query(
        `INSERT INTO posts (title, content, tags, user_id) 
         VALUES ($1, $2, $3, $4)`,
        [post.title, post.content, post.tags, userId]
      )
    }

    console.log('sample data seeded successfully')
  } catch (err) {
    console.error('error seeding data:', err)
    throw err
  } finally {
    client.release()
  }
}