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

  const tagObjects = await Tag.find({ name: { $in: tags } });
  const newPost = new Post({
    title,
    desc,
    image: imageBase64,
    tags: tagObjects.map((tag) => tag._id),
  });

  return newPost.save();
};
