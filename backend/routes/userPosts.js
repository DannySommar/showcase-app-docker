import express from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import { createUserPost, getUserPosts } from '../controllers/userPostController.js'

export const userPostsRouter = express.Router()

userPostsRouter.post('/create', requireAuth, createUserPost)
userPostsRouter.get('/get', requireAuth, getUserPosts)