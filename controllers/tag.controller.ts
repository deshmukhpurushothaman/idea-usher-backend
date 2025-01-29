import { Request, Response } from 'express';
import {
  createTag,
  updateTag,
  deleteTag,
  getAllTags,
  getTagById,
} from '../services/tag.service';
import { ERROR_MESSAGES, HTTP_STATUS } from '../utils/constants';

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
    res.status(HTTP_STATUS.OK).json(tags);
  } catch (error) {
    res
      .status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.UNKNOWN_ERROR });
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
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.TAG_NOT_FOUND });
    }
    res.status(HTTP_STATUS.OK).json(tag);
  } catch (error) {
    res
      .status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR });
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
    res.status(HTTP_STATUS.CREATED).json(tag);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR });
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
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.TAG_NOT_FOUND });
    }
    res.status(HTTP_STATUS.OK).json(tag);
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error updating tag',
      error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    });
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
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.TAG_NOT_FOUND });
    }
    res.status(HTTP_STATUS.OK).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error deleting tag',
      error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    });
  }
};
