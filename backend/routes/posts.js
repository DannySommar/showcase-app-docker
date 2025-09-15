import express from 'express'
import { getPosts } from '../controllers/postControllers.js'

export const postsRouter = express.Router()

postsRouter.get('/', getPosts)