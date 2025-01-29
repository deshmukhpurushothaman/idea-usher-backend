import { Router } from 'express';
import { addTag } from '../controllers/tag.controller';

const router = Router();

router.post('/', addTag);

export default router;
