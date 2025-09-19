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
        console.log('table created ok')
    } catch (err) {
        console.error('error creating db: ', err)
        throw err
    } finally {
        client.release()
    }
}