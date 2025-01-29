import Tag from '../models/Tag';
import { HTTP_STATUS, ERROR_MESSAGES } from '../utils/constants';

/**
 * Service to create a new tag.
 * @param {string} name - The name of the tag to be created.
 *
 * @returns {Promise<Tag>} The newly created tag.
 *
 * @example
 * const newTag = await createTag('Technology');
 */
export const createTag = async (name: string) => {
  try {
    const newTag = new Tag({ name });
    return await newTag.save();
  } catch (error) {
    console.error(error);
    throw {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

/**
 * Service to update an existing tag by ID.
 * @param {string} id - The ID of the tag to be updated.
 * @param {string} name - The updated name for the tag.
 *
 * @returns {Promise<Tag | null>} The updated tag or null if not found.
 *
 * @example
 * const updatedTag = await updateTag('tagId', 'Updated Tag');
 */
export const updateTag = async (id: string, name: string) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedTag) {
      throw {
        status: HTTP_STATUS.NOT_FOUND,
        message: ERROR_MESSAGES.TAG_NOT_FOUND,
      };
    }
    return updatedTag;
  } catch (error) {
    console.error(error);
    throw {
      status: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

/**
 * Service to delete a tag by ID.
 * @param {string} id - The ID of the tag to be deleted.
 *
 * @returns {Promise<Tag | null>} The deleted tag or null if not found.
 *
 * @example
 * const deletedTag = await deleteTag('tagId');
 */
export const deleteTag = async (id: string) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(id);
    if (!deletedTag) {
      throw {
        status: HTTP_STATUS.NOT_FOUND,
        message: ERROR_MESSAGES.TAG_NOT_FOUND,
      };
    }
    return deletedTag;
  } catch (error) {
    console.error(error);
    throw {
      status: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

/**
 * Service to fetch all tags.
 *
 * @returns {Promise<Tag[]>} A list of all tags.
 *
 * @example
 * const tags = await getAllTags();
 */
export const getAllTags = async () => {
  try {
    return await Tag.find({});
  } catch (error) {
    console.error(error);
    throw {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

/**
 * Service to fetch a tag by its ID.
 * @param {string} id - The ID of the tag to be fetched.
 *
 * @returns {Promise<Tag | null>} The tag with the specified ID, or null if not found.
 *
 * @example
 * const tag = await getTagById('tagId');
 */
export const getTagById = async (id: string) => {
  try {
    const tag = await Tag.findById(id);
    if (!tag) {
      throw {
        status: HTTP_STATUS.NOT_FOUND,
        message: ERROR_MESSAGES.TAG_NOT_FOUND,
      };
    }
    return tag;
  } catch (error) {
    console.error(error);
    throw {
      status: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};
