import { Request, Response } from 'express';
import { getPosts, createPost } from '../services/post.service';

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

export const addPost = async (req: Request, res: Response) => {
  try {
    const post = await createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating post', error: error.message });
  }
};
