import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface for the Tag document.
 * @interface ITag
 * @extends Document
 */
export interface ITag extends Document {
  /**
   * The name of the tag.
   * @type {string}
   * @required
   */
  name: string;
}

/**
 * Mongoose schema for the Tag model.
 * @const tagSchema
 * @type {Schema}
 */
const tagSchema = new Schema<ITag>({
  /**
   * The name of the tag.
   * @type {String}
   * @required
   */
  name: { type: String, required: true },
});

/**
 * Mongoose model for the Tag collection.
 * @type {mongoose.Model<ITag>}
 */
const Tag = mongoose.model<ITag>('Tag', tagSchema);

export default Tag;
