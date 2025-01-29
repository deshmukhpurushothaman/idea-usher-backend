import { Request, Response } from 'express';
import {
  createTag,
  updateTag,
  deleteTag,
  getAllTags,
  getTagById,
} from '../services/tag.service';

/**
 * Controller to fetch all tags.
 * @param {Request} _req - The Express request object, which doesn't contain any parameters.
 * @param {Response} res - The Express response object used to send back the API response.
 *
 * @returns {Promise<void>} Resolves with a list of tags or error response.
 *
 * @example
 * // Example request:
 * GET /tags
 */
export const getAllTagsController = async (_req: Request, res: Response) => {
  try {
    const tags = await getAllTags();
    res.status(200).json(tags);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching tags', error: error.message });
  }
};

/**
 * Controller to fetch a specific tag by its ID.
 * @param {Request} req - The Express request object, which contains the tag ID in the URL parameters.
 * @param {Response} res - The Express response object used to send back the API response.
 *
 * @returns {Promise<void>} Resolves with the tag data or a 404 error if the tag is not found.
 *
 * @example
 * // Example request:
 * GET /tags/:id
 */
export const getTag = async (req: Request, res: Response): Promise<any> => {
  try {
    const tag = await getTagById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching tag', error: error.message });
  }
};

/**
 * Controller to create a new tag with the provided name.
 * @param {Request} req - The Express request object, which contains the tag data in the body.
 * @param {Response} res - The Express response object used to send back the API response.
 *
 * @returns {Promise<void>} Resolves with the newly created tag or error response.
 *
 * @example
 * // Example request:
 * POST /tags
 * Body:
 * {
 *   "name": "Technology"
 * }
 */
export const addTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const tag = await createTag(name);
    res.status(201).json(tag);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating tag', error: error.message });
  }
};

/**
 * Controller to update a tag by its ID.
 * @param {Request} req - The Express request object, which contains the tag ID in the URL and updated data in the body.
 * @param {Response} res - The Express response object used to send back the API response.
 *
 * @returns {Promise<void>} Resolves with the updated tag data or a 404 error if the tag is not found.
 *
 * @example
 * // Example request:
 * PUT /tags/:id
 * Body:
 * {
 *   "name": "Updated Tag"
 * }
 */
export const updateTagById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const tag = await updateTag(req.params.id, req.body.name);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating tag', error: error.message });
  }
};

/**
 * Controller to delete a tag by its ID.
 * @param {Request} req - The Express request object, which contains the tag ID in the URL parameters.
 * @param {Response} res - The Express response object used to send back the API response.
 *
 * @returns {Promise<void>} Resolves with a success message or a 404 error if the tag is not found.
 *
 * @example
 * // Example request:
 * DELETE /tags/:id
 */
export const deleteTagById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const tag = await deleteTag(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting tag', error: error.message });
  }
};
