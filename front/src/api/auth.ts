import api from "../axios/config";
import { ACCESS_TOKEN_NAME } from "../constants/variables";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../models/user/api";

export function login(data: LoginRequest) {
  return api.post<LoginResponse>("/auth/signin", {
    email: data.email,
    password: data.password,
  });
}

export function register(data: RegisterRequest) {
  return api.post<RegisterResponse>("/auth/signup", {
    email: data.email,
    password: data.password,
    username: data.username,
  });
}

export function getProfile() {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  return api.get("/profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function logout() {
  return api.post("/auth/logout");
}
