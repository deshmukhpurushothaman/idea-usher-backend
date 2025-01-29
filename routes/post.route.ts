import { Router } from 'express';
import {
  getAllPosts,
  getPost,
  getPostsWithCondition,
  addPost,
  updatePostById,
  deletePostById,
} from '../controllers/post.controller';
import { uploadSingleImage } from '../middlewares/fileUpload.middleware';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPost);
router.post('/condition', getPostsWithCondition);
router.post('/', uploadSingleImage, addPost);
router.put('/:id', updatePostById);
router.delete('/:id', deletePostById);

export default router;
