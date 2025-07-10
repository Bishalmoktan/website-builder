import { env } from "@/config/env";
import axios from "axios";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export default api;
