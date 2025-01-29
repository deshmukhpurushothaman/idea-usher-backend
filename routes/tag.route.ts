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

/**
 * Route to fetch all tags.
 * @route GET /tags
 * @group Tags - Operations related to tags
 * @returns {Array.<Tag>} 200 - Array of tags
 * @returns {Error} 500 - Internal server error
 */
router.get('/', getAllTagsController);

/**
 * Route to fetch a single tag by its ID.
 * @route GET /tags/{id}
 * @group Tags - Operations related to tags
 * @param {string} id.path - Tag ID
 * @returns {Tag} 200 - The requested tag
 * @returns {Error} 500 - Internal server error
 */
router.get('/:id', getTag);

/**
 * Route to get tags based on specific conditions.
 * @route POST /tags/condition
 * @group Tags - Operations related to tags
 * @param {Object} body - Filter criteria for tags (e.g., name, etc.)
 * @returns {Array.<Tag>} 200 - Array of tags matching the condition
 * @returns {Error} 500 - Internal server error
 */
router.post('/condition', getTagsWithCondition);

/**
 * Route to create a new tag.
 * @route POST /tags
 * @group Tags - Operations related to tags
 * @param {string} name.body - The name of the tag
 * @returns {Tag} 201 - The newly created tag
 * @returns {Error} 500 - Internal server error
 */
router.post('/', addTag);

/**
 * Route to update a tag by its ID.
 * @route PUT /tags/{id}
 * @group Tags - Operations related to tags
 * @param {string} id.path - Tag ID
 * @param {string} name.body - The new name of the tag
 * @returns {Tag} 200 - The updated tag
 * @returns {Error} 500 - Internal server error
 */
router.put('/:id', updateTagById);

/**
 * Route to delete a tag by its ID.
 * @route DELETE /tags/{id}
 * @group Tags - Operations related to tags
 * @param {string} id.path - Tag ID
 * @returns {string} 200 - Confirmation message
 * @returns {Error} 500 - Internal server error
 */
router.delete('/:id', deleteTagById);

export default router;
