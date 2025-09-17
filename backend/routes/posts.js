import express from 'express'
import { getPosts, getTags } from '../controllers/postControllers.js'

export const postsRouter = express.Router()

postsRouter.get('/tags', getTags)
postsRouter.get('/', getPosts)
