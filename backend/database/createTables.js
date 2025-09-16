import {pool} from './index.js'

export async function createTables() {
    const client = await pool.connect()

    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                tags TEXT[] DEFAULT '{}'
                
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