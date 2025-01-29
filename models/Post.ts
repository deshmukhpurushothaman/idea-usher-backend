import mongoose, { Document, Schema } from 'mongoose';
import { ITag } from './Tag';

export interface IPost extends Document {
  title: string;
  desc: string;
  image: string;
  tags: ITag[];
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
});

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
