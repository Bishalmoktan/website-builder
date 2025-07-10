import { SignInParams, SignUpParams } from "@/types";
import api from "../api";

export async function signin(data: SignInParams) {
  try {
    const res = await api.post("/api/v1/auth/signin", data);
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function signup(data: SignUpParams) {
  try {
    const res = await api.post("/api/v1/auth/signup", data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const res = await api.get("/api/v1/auth/me");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

export async function logout() {
  try {
    const res = await api.get("/api/v1/auth/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
}
