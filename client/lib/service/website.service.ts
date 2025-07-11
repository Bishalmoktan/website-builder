import { CreateWebsiteParams, UpdateWebsiteParams } from "@/types";
import api from "../api";

export async function getAllWebsites() {
  try {
    const res = await api.get("/api/v1/website");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserWebsites() {
  try {
    const res = await api.get("/api/v1/website/my-listings");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getWebsiteById(id: string) {
  try {
    const res = await api.get(`/api/v1/website/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createWebsite(data: CreateWebsiteParams) {
  try {
    const res = await api.post("/api/v1/website", data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateWesbite(data: UpdateWebsiteParams) {
  try {
    const res = await api.patch(`/api/v1/website/${data._id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
}
