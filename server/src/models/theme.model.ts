import { Schema } from "mongoose";

export const ThemeSchema = new Schema({
  primaryColor: String,
  secondaryColor: String,
  fontFamily: String,
  backgroundColor: String,
});
