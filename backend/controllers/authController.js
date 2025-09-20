import validator from 'validator'
import bcrypt from 'bcryptjs'

import { pool } from "../database/index.js";

export async function registerUser(req, res) {

    let { name, email, username, password } = req.body

    console.log('tried registering in with ', { name, email, username, password } )

    if (!name || !email || !username || !password) {

        return res.status(400).json({ error: 'All fields are required.' })

    }

    name = name.trim()
    email = email.trim()
    username = username.trim()

    if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username))
    {
        return res.status(400).json(
            { error: 'Username must be 1-20 characters, using letters, numbers, _ or -.' }
        )
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' })
    }

    const client = await pool.connect();
    try {

        const existing = await client.query('SELECT id FROM users WHERE email = $1 OR username = $2', [email, username])
        console.log('user exists? - row count:', existing.rowCount)

        if (existing.rowCount > 0) {
            return res.status(400).json({ error: 'Email or username already in use.' })
        }

        const hashed = await bcrypt.hash(password, 10)

        const result = await client.query('INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING id', [name, email, username, hashed]);
        console.log(result)

        req.session.userId = result.rows[0].id

        res.status(201).json({ message: 'User registered' })
    } catch (err) {

        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Registration failed. Please try again.' })
    } finally {
        client.release()
    }

}

export async function loginUser(req, res) {

    let { username, password } = req.body
    console.log('tried loging in with ', { username, password } )

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' } )
    }

    username = username.trim()
    const client = await pool.connect()

    try {

        const result = await client.query('SELECT * FROM users WHERE username = $1', [username])
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials'})
        }

        const user = result.rows[0]
        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials'})
        }

        req.session.userId = user.id
        res.json({ message: 'Logged in' })

    } catch (err) {
        console.error('Login error:', err.message)
        res.status(500).json({ error: 'Login failed. Please try again.' })
    } finally {
        client.release()
    }
}
export async function logoutUser(req, res) {
    req.session.destroy(() => {
        res.json({message: 'logged out'})
    })
}