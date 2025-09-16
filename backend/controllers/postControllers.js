// import postsData from '../data/posts.json' with { type: 'json' };

// export async function getPosts(req, res) {
//   try {
//     res.json(postsData.posts)
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch posts' })
//   }
// }

import { pool } from "../database/index.js";

export async function getPosts(req, res) {
  try {
    console.log('getting posts from database')
    const result = await pool.query(`SELECT * FROM posts`)
    res.json(result.rows)
  } catch (err) {
    console.error('error fetching posts:', err)
    res.status(500).json({error: 'failed to fetch posts'})
  }
}