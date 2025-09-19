import { pool } from "../database/index.js";

export async function getCurrentUser(req, res) {
    
    const client = await pool.connect();
    try {

        if (!req.session.userId) {
            return res.json({ isLoggedIn: false })
        }
        const user = await client.query('SELECT name FROM users WHERE id = $1', [req.session.userId])

        res.json({ isLoggedIn: true, name: user.name})

    } catch (err) {
        console.error('getCurrentUser error:', err)
        res.status(500).json({ error: 'Internal server error' })
    } finally {
        client.release()
    }
} 