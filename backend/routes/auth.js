import express from 'express'

import { registerUser, loginUser, logoutUser} from "../controllers/authController.js";

export const authRouter = express.Router()

authRouter.get('/register', registerUser)
authRouter.get('/login', loginUser)
authRouter.get('/logout', logoutUser)