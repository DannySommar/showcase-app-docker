import { pool } from "../database/index.js";

export async function getTags(req, res) {
  try {
    console.log('getting all tags from database')
    const result = await pool.query(`SELECT DISTINCT unnest(tags) as tag FROM posts`)
    const tags = result.rows.map(row => row.tag)
    res.json(tags)
  } catch (err) {
    console.error('error fetching tags:', err)
    res.status(500).json({error: 'failed to fetch tags'})
  }
}

export async function getPosts(req, res) {
  try {
    console.log('getting posts from database')
    let query = 'SELECT * FROM posts'
    let params = []
    let whereConditions = []
    let paramCount = 0

    const { tag, search } = req.query

    if (tag) {
      paramCount++
      whereConditions.push(`$${paramCount} = ANY(tags)`)
      params.push(tag)
    }
    if (search) {
      paramCount++
      const searchPattern = `%${search}%`
      whereConditions.push(`(title ILIKE $${paramCount} OR content ILIKE $${paramCount})`)
      params.push(searchPattern)
    }

    if (whereConditions.length > 0) {
      query += ' WHERE ' + whereConditions.join(' AND ')
    }

    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (err) {
    console.error('error fetching posts:', err)
    res.status(500).json({error: 'failed to fetch posts'})
  }
}