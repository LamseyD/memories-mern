import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router();

//GET
router.get('/', getPosts);
//POST
router.post('/', auth, createPost);
//PUT
router.patch('/:id', auth, updatePost);
//DELETE
router.delete('/:id', auth, deletePost);
//Like
router.patch('/:id/likePost', auth, likePost)

export default router;