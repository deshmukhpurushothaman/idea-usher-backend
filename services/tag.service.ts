import Tag from '../models/Tag';

/**
 * Service to create a new tag.
 * @param {string} name - The name of the tag to be created.
 *
 * @returns {Promise<Tag>} The newly created tag.
 *
 * @example
 * // Example usage:
 * const newTag = await createTag('Technology');
 */
export const createTag = async (name: string) => {
  const newTag = new Tag({ name });
  return newTag.save();
};

/**
 * Service to update an existing tag by ID.
 * @param {string} id - The ID of the tag to be updated.
 * @param {string} name - The updated name for the tag.
 *
 * @returns {Promise<Tag | null>} The updated tag or null if not found.
 *
 * @example
 * // Example usage:
 * const updatedTag = await updateTag('tagId', 'Updated Tag');
 */
export const updateTag = async (id: string, name: string) => {
  return Tag.findByIdAndUpdate(id, { name }, { new: true });
};

/**
 * Service to delete a tag by ID.
 * @param {string} id - The ID of the tag to be deleted.
 *
 * @returns {Promise<Tag | null>} The deleted tag or null if not found.
 *
 * @example
 * // Example usage:
 * const deletedTag = await deleteTag('tagId');
 */
export const deleteTag = async (id: string) => {
  return Tag.findByIdAndDelete(id);
};

/**
 * Service to fetch all tags.
 *
 * @returns {Promise<Tag[]>} A list of all tags.
 *
 * @example
 * // Example usage:
 * const tags = await getAllTags();
 */
export const getAllTags = async () => {
  return Tag.find({});
};

/**
 * Service to fetch a tag by its ID.
 * @param {string} id - The ID of the tag to be fetched.
 *
 * @returns {Promise<Tag | null>} The tag with the specified ID, or null if not found.
 *
 * @example
 * // Example usage:
 * const tag = await getTagById('tagId');
 */
export const getTagById = async (id: string) => {
  return Tag.findById(id);
};
