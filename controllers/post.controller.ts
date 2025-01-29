import { Request, Response } from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPostsByCondition,
} from '../services/post.service';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getPosts(req.query, req.query);
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching posts', error: error.message });
  }
};

export const getPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching post', error: error.message });
  }
};

export const getPostsWithCondition = async (req: Request, res: Response) => {
  try {
    const posts = await getPostsByCondition(req.body.condition);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching posts by condition',
      error: error.message,
    });
  }
};

export const addPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, desc, tags } = req.body;

    // Ensure tags is parsed into an array if it's a string
    const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);

    // Ensure image file exists
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
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

    res.status(201).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating post', error: error.message });
  }
};

export const updatePostById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const post = await updatePost(req.params.id, req.body);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating post', error: error.message });
  }
};

export const deletePostById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const post = await deletePost(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting post', error: error.message });
  }
};
