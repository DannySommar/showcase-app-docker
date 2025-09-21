import {pool} from './index.js'

export async function createTables() {
    const client = await pool.connect()

    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(50) UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `)

        await client.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                tags TEXT[] DEFAULT '{}',
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
            )    
        `)

        // sometimes past test posts are created without user_id, so need to add the column manually
        const columnCheck = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'posts' AND column_name = 'user_id'
        `)

        if (columnCheck.rows.length === 0) {
            await client.query(`
                ALTER TABLE posts 
                ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
            `)
        }

        console.log('tables created ok')
    } catch (err) {
        console.error('error creating db: ', err)
        throw err
    } finally {
        client.release()
    }
}