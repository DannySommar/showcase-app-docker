import { pool } from "../database/index.js";

export async function createUserPost(req, res) {
    const {title, content, tags} = req.body
    const userId = req.session.userId

    if (!title || !content) {
        res.status(400).json({ error : 'Titlle and content needed'})
    }

    const client = await pool.connect()

    try {
        const tagsArray = Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()) : []);

        const result = await client.query(`INSERT INTO posts (title, content, tags, user_id)
                                            VALUES  ($1, $2, $3, $4) RETURNING *`, [title, content, tags, userId])

        res.status(201).json({message: 'Post created'})

    } catch (err) {
        console.error('Post creation error:', err.message);
        res.status(500).json({ error: 'failed to create post'})
    } finally {
        client.release()
    }
}

export async function getUserPosts(req, res) {
    
    const userId = req.session.userId
    const client = await pool.connect()

    try {
        const result = await client.query(`SELECT * FROM posts WHERE user_id = $1`, [userId])
        res.json({posts: result.rows})

    } catch (err) {
        console.error('error getting user posts:', err.message);
        res.status(500).json({ error: 'failed to get user posts'})
    } finally {
        client.release()
    }
}