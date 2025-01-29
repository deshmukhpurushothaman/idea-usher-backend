import { Router } from 'express';
import { getAllPosts, addPost } from '../controllers/post.controller';

const router = Router();

router.get('/', getAllPosts);
router.post('/', addPost);

export default router;
