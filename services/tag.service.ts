import Tag from '../models/Tag';

export const createTag = async (name: string) => {
  const newTag = new Tag({ name });
  return newTag.save();
};
