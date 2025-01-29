import { Request, Response } from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} from '../services/post.service';
import { ERROR_MESSAGES, HTTP_STATUS } from '../utils/constants';

/**
 * Controller to fetch all posts with optional query parameters for sorting and pagination.
 * @param {Request} req - The Express request object, which may contain query parameters.
 * @param {Response} res - The Express response object used to send back the API response.
 *
 * @returns {Promise<void>} Resolves with a list of posts or error response.
 *
 * @example
 * // Example request:
 * GET /posts?page=1&limit=10&sort=desc
 */
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getPosts(req.query, req.query);
    res.status(HTTP_STATUS.OK).json(posts);
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching posts',
      error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    });
  }
};

/**
 * Controller to fetch a specific post by its ID.
 * @param {Request} req - The Express request object, which contains the post ID in the URL parameters.
 * @param {Response} res - The Express response object used to send back the API response.
 *
 * @returns {Promise<void>} Resolves with the post data or a 404 error if the post is not found.
 *
 * @example
 * // Example request:
 * GET /posts/:id
 */
export const getPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.POST_NOT_FOUND });
    }
    res.status(HTTP_STATUS.OK).json(post);
  } catch (error) {
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching post',
      error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    });
  }
};

/**
 * Controller to create a new post with title, description, tags, and image.
 * @param {Request} req - The Express request object, which contains the post data in the body.
 * @param {Response} res - The Express response object used to send back the API response.
 *
 * @returns {Promise<void>} Resolves with the newly created post or error response.
 *
 * @example
 * // Example request:
 * POST /posts
 * Content-Type: multipart/form-data
 * Body:
 * {
 *   "title": "New Post",
 *   "desc": "This is a new post.",
 *   "tags": ["math", "education"],
 *   "image": <image file>
 * }
 */
export const addPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, desc, tags } = req.body;

    // Ensure tags is parsed into an array if it's a string
    const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);

    // Ensure image file exists
    if (!req.file) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: 'Image file is required.' });
    }

    // Convert the image buffer to Base64
    const imageBase64 = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString('base64')}`;

    // Call the service to create the post
    const post = await createPost({
      title,
      desc,
      tags: parsedTags,
      imageBase64,
    });

    res.status(HTTP_STATUS.CREATED).json(post);
  } catch (error) {
    res
      .status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({
        message: 'Error creating post',
        error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      });
  }
};

/**
 * Controller to update a post by its ID.
 * @param {Request} req - The Express request object, which contains the post ID in the URL and updated data in the body.
 * @param {Response} res - The Express response object used to send back the API response.
 *
 * @returns {Promise<void>} Resolves with the updated post data or a 404 error if the post is not found.
 *
 * @example
 * // Example request:
 * PUT /posts/:id
 * Body:
 * {
 *   "title": "Updated Post Title",
 *   "desc": "Updated description."
 * }
 */
export const updatePostById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const post = await updatePost(req.params.id, req.body);
    if (!post) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: ERROR_MESSAGES.POST_NOT_FOUND });
    }
    res.status(HTTP_STATUS.OK).json(post);
  } catch (error) {
    res
      .status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({
        message: 'Error updating post',
        error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      });
  }
};

/**
 * Controller to delete a post by its ID.
 * @param {Request} req - The Express request object, which contains the post ID in the URL.
 * @param {Response} res - The Express response object used to send back the API response.
 *
 * @returns {Promise<void>} Resolves with a success message or a 404 error if the post is not found.
 *
 * @example
 * // Example request:
 * DELETE /posts/:id
 */
export const deletePostById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const post = await deletePost(req.params.id);
    if (!post) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.POST_NOT_FOUND });
    }
    res.status(HTTP_STATUS.OK).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res
      .status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({
        message: 'Error deleting post',
        error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      });
  }
};
