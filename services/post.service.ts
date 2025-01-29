import Post from '../models/Post';
import Tag from '../models/Tag';

export const getPosts = async (filters: any, options: any) => {
  const { keyword, tag, sort, page, limit } = options;

  const query: any = {};

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { desc: { $regex: keyword, $options: 'i' } },
    ];
  }

  if (tag) {
    const tagObj = await Tag.findOne({ name: tag });
    if (tagObj) {
      query.tags = tagObj._id;
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

export const updatePost = async (id: string, postData: any) => {
  return Post.findByIdAndUpdate(id, postData, { new: true });
};

export const deletePost = async (id: string) => {
  return Post.findByIdAndDelete(id);
};

export const getPostById = async (id: string) => {
  return Post.findById(id).populate('tags');
};

export const getPostsByCondition = async (condition: any) => {
  return Post.find(condition).populate('tags');
};
