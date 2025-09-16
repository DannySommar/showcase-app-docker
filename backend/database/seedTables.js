import { pool } from "./index.js";
import { posts } from "./data.js";

export async function seedTables() {
  const client = await pool.connect()
  try {

    // clear past
    await client.query('DELETE FROM posts')

    // put in samople data
    for (const post of posts) {
      await client.query(
        `INSERT INTO posts (title, content, tags) 
         VALUES ($1, $2, $3)`,
        [post.title, post.content, post.tags]
      )
    }

    console.log('sample data seeded successfully')
  } catch (err) {
    console.error('error seeding data:', errerror)
    throw err
  } finally {
    client.release()
  }
}