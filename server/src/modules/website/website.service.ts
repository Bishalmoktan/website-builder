import Website from "../../models/website.model";
import { CreateWebsiteInput } from "./website.validator";

export const createWebsite = async (
  userId: string,
  data: CreateWebsiteInput
) => {
  const website = await Website.create({ ...data, user: userId });
  return website;
};

export const getAllWebsites = async () => {
  return await Website.find({ where: { isPublished: true } });
};

export const getUserWebsites = async (userId: string) => {
  return await Website.find({ user: userId });
};

export const getWebsiteById = async (id: string) => {
  return await Website.findById(id);
};

export const updateWebsite = async (
  id: string,
  data: Partial<CreateWebsiteInput>
) => {
  return await Website.findByIdAndUpdate(id, data, { new: true });
};

export const deleteWebsite = async (id: string) => {
  return await Website.findByIdAndDelete(id);
};
