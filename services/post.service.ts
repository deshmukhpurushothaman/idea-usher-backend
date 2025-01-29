import Post from '../models/Post';
import Tag from '../models/Tag';
import { HTTP_STATUS, ERROR_MESSAGES } from '../utils/constants';

export const getPosts = async (filters: any, options: any) => {
  try {
    const { keyword, tag, sort, page, limit } = options;

    // Validate for additional parameters in options
    const validKeys = ['keyword', 'tag', 'sort', 'page', 'limit'];
    const invalidKeys = Object.keys(options).filter(
      (key) => !validKeys.includes(key)
    );

    if (invalidKeys.length > 0) {
      throw {
        status: HTTP_STATUS.BAD_REQUEST,
        message: `${ERROR_MESSAGES.INVALID_PARAMETERS}: ${invalidKeys.join(
          ', '
        )}`,
      };
    }

    const query: any = {};

    // Handle keyword search
    if (keyword) {
      const keywordQuery = [
        { title: { $regex: keyword, $options: 'i' } },
        { desc: { $regex: keyword, $options: 'i' } },
      ];

      const keywordMatch = await Post.find({ $or: keywordQuery }).select('_id');

      if (keywordMatch.length > 0) {
        query.$or = keywordQuery;
      } else {
        query.$or = [{ _id: null }];
      }
    }

    // Handle tag filtering
    if (tag) {
      const tagObj = await Tag.findOne({ name: tag });
      if (tagObj) {
        query.tags = tagObj._id;
      } else {
        query.tags = null;
      }
    }

    const sortBy = sort || 'createdAt';
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;

    const posts = await Post.find(query)
      .populate('tags')
      .sort(sortBy)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return posts;
  } catch (error) {
    console.error(error);
    throw {
      status: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

export const createPost = async (postData: any) => {
  try {
    const { title, desc, imageBase64, tags } = postData;

    const tagObjects = await Tag.find({ name: { $in: tags } });
    const newPost = new Post({
      title,
      desc,
      image: imageBase64,
      tags: tagObjects.map((tag) => tag._id),
    });

    const savedPost = await newPost.save();
    return savedPost;
  } catch (error) {
    console.error(error);
    throw {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

export const updatePost = async (id: string, postData: any) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, postData, {
      new: true,
    });
    if (!updatedPost) {
      throw {
        status: HTTP_STATUS.NOT_FOUND,
        message: ERROR_MESSAGES.POST_NOT_FOUND,
      };
    }
    return updatedPost;
  } catch (error) {
    console.error(error);
    throw {
      status: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

export const deletePost = async (id: string) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      throw {
        status: HTTP_STATUS.NOT_FOUND,
        message: ERROR_MESSAGES.POST_NOT_FOUND,
      };
    }
    return deletedPost;
  } catch (error) {
    console.error(error);
    throw {
      status: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await Post.findById(id).populate('tags');
    if (!post) {
      throw {
        status: HTTP_STATUS.NOT_FOUND,
        message: ERROR_MESSAGES.POST_NOT_FOUND,
      };
    }
    return post;
  } catch (error) {
    console.error(error);
    throw {
      status: error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};
