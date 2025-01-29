import mongoose, { Document, Schema } from 'mongoose';
import { ITag } from './Tag';

/**
 * Interface for the Post document.
 * @interface IPost
 * @extends Document
 */
export interface IPost extends Document {
  /**
   * The title of the post.
   * @type {string}
   * @required
   */
  title: string;

  /**
   * The description of the post.
   * @type {string}
   * @required
   */
  desc: string;

  /**
   * The image associated with the post, stored as a Base64 string.
   * @type {string}
   * @required
   */
  image: string;

  /**
   * The tags associated with the post, referencing Tag documents.
   * @type {ITag[]}
   */
  tags: ITag[];
}

/**
 * Mongoose schema for the Post model.
 * @const postSchema
 * @type {Schema}
 */
const postSchema = new Schema<IPost>({
  /**
   * The title of the post.
   * @type {String}
   * @required
   */
  title: { type: String, required: true },

  /**
   * The description of the post.
   * @type {String}
   * @required
   */
  desc: { type: String, required: true },

  /**
   * The image of the post in Base64 format.
   * @type {String}
   * @required
   */
  image: { type: String, required: true },

  /**
   * The tags associated with the post, referenced by ObjectId.
   * @type {mongoose.Schema.Types.ObjectId[]}
   * @ref {Tag}
   */
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
});

/**
 * Mongoose model for the Post collection.
 * @type {mongoose.Model<IPost>}
 */
const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
