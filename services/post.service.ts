import Post from '../models/Post';
import Tag from '../models/Tag';

/**
 * Service to fetch posts based on various filters and options.
 * @param {Object} filters - Filters for the query, including keyword and tag.
 * @param {Object} options - Options for the query, including sorting, pagination, etc.
 * @param {string} options.keyword - Search term to filter posts by title or description.
 * @param {string} options.tag - The tag name to filter posts by.
 * @param {string} options.sort - The field to sort posts by (e.g., 'createdAt').
 * @param {string} options.page - The page number for pagination.
 * @param {string} options.limit - The number of posts per page.
 *
 * @returns {Promise<Post[]>} A list of posts that match the query filters and options.
 *
 * @example
 * // Example usage:
 * const posts = await getPosts({}, { keyword: 'tech', tag: 'AI', sort: 'createdAt', page: '1', limit: '10' });
 */
export const getPosts = async (filters: any, options: any) => {
  const { keyword, tag, sort, page, limit } = options;

  // Validate for additional parameters in options
  const validKeys = ['keyword', 'tag', 'sort', 'page', 'limit'];
  const invalidKeys = Object.keys(options).filter(
    (key) => !validKeys.includes(key)
  );

  if (invalidKeys.length > 0) {
    throw {
      status: 400,
      message: `Invalid parameters: ${invalidKeys.join(', ')}`,
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
      // If no posts match the keyword, add a condition that will result in no matches
      query.$or = [{ _id: null }];
    }
  }

  // Handle tag filtering
  if (tag) {
    const tagObj = await Tag.findOne({ name: tag });
    if (tagObj) {
      query.tags = tagObj._id;
    } else {
      // If the tag doesn't exist, set a condition that will result in no posts
      query.tags = null;
    }
  }

  const sortBy = sort || 'createdAt';
  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(limit, 10) || 10;

  return Post.find(query)
    .populate('tags')
    .sort(sortBy)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
};

/**
 * Service to create a new post.
 * @param {Object} postData - The data of the post to be created.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.desc - The description of the post.
 * @param {string} postData.imageBase64 - The base64-encoded image of the post.
 * @param {string[]} postData.tags - The tags associated with the post.
 *
 * @returns {Promise<Post>} The newly created post.
 *
 * @example
 * // Example usage:
 * const newPost = await createPost({ title: 'New Post', desc: 'Description of the post', imageBase64: '...', tags: ['Tech', 'AI'] });
 */
export const createPost = async (postData: any) => {
  const { title, desc, imageBase64, tags } = postData;

  // Find tags in the database
  const tagObjects = await Tag.find({ name: { $in: tags } });

  // Create a new post
  const newPost = new Post({
    title,
    desc,
    image: imageBase64,
    tags: tagObjects.map((tag) => tag._id), // Store tag IDs
  });

  // Save the post to the database
  return newPost.save();
};

/**
 * Service to update an existing post by ID.
 * @param {string} id - The ID of the post to be updated.
 * @param {Object} postData - The updated data for the post.
 *
 * @returns {Promise<Post | null>} The updated post or null if not found.
 *
 * @example
 * // Example usage:
 * const updatedPost = await updatePost('postId', { title: 'Updated Post' });
 */
export const updatePost = async (id: string, postData: any) => {
  return Post.findByIdAndUpdate(id, postData, { new: true });
};

/**
 * Service to delete a post by ID.
 * @param {string} id - The ID of the post to be deleted.
 *
 * @returns {Promise<Post | null>} The deleted post or null if not found.
 *
 * @example
 * // Example usage:
 * const deletedPost = await deletePost('postId');
 */
export const deletePost = async (id: string) => {
  return Post.findByIdAndDelete(id);
};

/**
 * Service to fetch a post by its ID.
 * @param {string} id - The ID of the post to be fetched.
 *
 * @returns {Promise<Post | null>} The post with the specified ID, or null if not found.
 *
 * @example
 * // Example usage:
 * const post = await getPostById('postId');
 */
export const getPostById = async (id: string) => {
  return Post.findById(id).populate('tags');
};
