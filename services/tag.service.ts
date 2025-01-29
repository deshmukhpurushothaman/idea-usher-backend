import Tag from '../models/Tag';

export const createTag = async (name: string) => {
  const newTag = new Tag({ name });
  return newTag.save();
};

export const updateTag = async (id: string, name: string) => {
  return Tag.findByIdAndUpdate(id, { name }, { new: true });
};

export const deleteTag = async (id: string) => {
  return Tag.findByIdAndDelete(id);
};

export const getAllTags = async () => {
  return Tag.find({});
};

export const getTagById = async (id: string) => {
  return Tag.findById(id);
};

export const getTagsByCondition = async (condition: any) => {
  return Tag.find(condition);
};
