import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema, Document } from "mongoose";

import { WebsiteSchema } from "./website.model";
import config from "../config";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  websites: (typeof WebsiteSchema)[];
  generateAuthTokens: () => string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  websites: [WebsiteSchema],
});

UserSchema.methods.generateAuthTokens = function (): string {
  return jwt.sign({ _id: this._id }, config.jwt.secret, { expiresIn: "7d" });
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
