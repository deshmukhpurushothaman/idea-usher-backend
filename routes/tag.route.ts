import { Router } from 'express';
import {
  getAllTagsController,
  getTag,
  getTagsWithCondition,
  addTag,
  updateTagById,
  deleteTagById,
} from '../controllers/tag.controller';

const router = Router();

router.get('/', getAllTagsController);
router.get('/:id', getTag);
router.post('/condition', getTagsWithCondition);
router.post('/', addTag);
router.put('/:id', updateTagById);
router.delete('/:id', deleteTagById);

export default router;
