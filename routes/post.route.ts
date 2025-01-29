import { Router } from 'express';
import {
  getAllPosts,
  getPost,
  addPost,
  updatePostById,
  deletePostById,
} from '../controllers/post.controller';
import { uploadSingleImage } from '../middlewares/fileUpload.middleware';

const router = Router();

/**
 * Route to fetch all posts.
 * @route GET /posts
 * @group Posts - Operations related to posts
 * @returns {Array.<Post>} 200 - Array of posts
 * @returns {Error} 500 - Internal server error
 */
router.get('/', getAllPosts);

/**
 * Route to fetch a single post by its ID.
 * @route GET /posts/{id}
 * @group Posts - Operations related to posts
 * @param {string} id.path - Post ID
 * @returns {Post} 200 - The requested post
 * @returns {Error} 500 - Internal server error
 */
router.get('/:id', getPost);

/**
 * Route to create a new post.
 * @route POST /posts
 * @group Posts - Operations related to posts
 * @param {string} title.body - The title of the post
 * @param {string} desc.body - The description of the post
 * @param {Array.<string>} tags.body - Array of tags associated with the post
 * @param {file} image.body - Image to be uploaded (in Base64 format)
 * @returns {Post} 201 - The newly created post
 * @returns {Error} 500 - Internal server error
 */
router.post('/', uploadSingleImage, addPost);

/**
 * Route to update a post by its ID.
 * @route PUT /posts/{id}
 * @group Posts - Operations related to posts
 * @param {string} id.path - Post ID
 * @param {string} title.body - The title of the post
 * @param {string} desc.body - The description of the post
 * @param {Array.<string>} tags.body - Array of tags associated with the post
 * @param {file} image.body - Image to be uploaded (in Base64 format)
 * @returns {Post} 200 - The updated post
 * @returns {Error} 500 - Internal server error
 */
router.put('/:id', updatePostById);

/**
 * Route to delete a post by its ID.
 * @route DELETE /posts/{id}
 * @group Posts - Operations related to posts
 * @param {string} id.path - Post ID
 * @returns {string} 200 - Confirmation message
 * @returns {Error} 500 - Internal server error
 */
router.delete('/:id', deletePostById);

export default router;
