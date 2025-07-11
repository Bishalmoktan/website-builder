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
