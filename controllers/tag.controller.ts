import { Request, Response } from 'express';
import { createTag } from '../services/tag.service';

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
