import { Schema } from "mongoose";

export const BlockSchema = new Schema({
  id: { type: String, required: true },
  type: String,
  content: Schema.Types.Mixed,
  style: Schema.Types.Mixed,
});
