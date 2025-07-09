import mongoose, { Schema } from "mongoose";
import { ThemeSchema } from "./theme.model";
import { BlockSchema } from "./block.model";

export const WebsiteSchema = new Schema({
  title: { type: String, required: true },
  blocks: [BlockSchema],
  theme: ThemeSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
