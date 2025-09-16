import { Pool } from 'pg'

// try to integrate end file somehow in here and docker compose 
export const pool = new Pool({
  host: 'db',
  port: 5432,
  database: 'mydatabase',
  user: 'myuser',
  password: 'mypassword'
})