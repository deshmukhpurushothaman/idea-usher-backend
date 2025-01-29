import { Request, Response } from 'express';
import {
  createTag,
  updateTag,
  deleteTag,
  getAllTags,
  getTagById,
  getTagsByCondition,
} from '../services/tag.service';

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

export const getTagsWithCondition = async (req: Request, res: Response) => {
  try {
    const tags = await getTagsByCondition(req.body.condition);
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching tags by condition',
      error: error.message,
    });
  }
};

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
