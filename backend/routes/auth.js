import express from 'express'

import { registerUser, loginUser, logoutUser} from "../controllers/authController.js";
import {getCurrentUser} from "../controllers/meController.js"

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/logout', logoutUser)
authRouter.get('/me', getCurrentUser)