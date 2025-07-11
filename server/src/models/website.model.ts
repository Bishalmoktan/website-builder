import mongoose, { Schema, Document } from "mongoose";

const BlockSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: Schema.Types.Mixed },
  style: { type: Schema.Types.Mixed },
});

const ThemeSchema = new Schema({
  primaryColor: String,
  secondaryColor: String,
  fontFamily: String,
  backgroundColor: String,
});

export interface IWebsite extends Document {
  title: string;
  blocks: (typeof BlockSchema)[];
  theme: typeof ThemeSchema;
  isPublished: boolean;
  user: mongoose.Types.ObjectId;
}

export const WebsiteSchema = new Schema<IWebsite>(
  {
    title: { type: String, required: true },
    blocks: [BlockSchema],
    theme: ThemeSchema,
    isPublished: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Website = mongoose.model<IWebsite>("Website", WebsiteSchema);
export default Website;
