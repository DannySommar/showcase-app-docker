import { pool } from "../database/index.js";


export async function registerUser(req, res) {

}

export async function loginUser(req, res) {
    
}

export async function logoutUser(req, res) {
    req.session.destroy(() => {
        res.json({message: 'logged out'})
    })
}