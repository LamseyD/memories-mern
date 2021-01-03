import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'


const router = express.Router();

//GET
router.get('/', getPosts);
//POST
router.post('/', createPost);
//PUT
router.patch('/:id', updatePost);
//DELETE
router.delete('/:id', deletePost);
//Like
router.patch('/:id/likePost', likePost)

export default router;