export type User = {
  id: number;
  uuid: string;
  username: string;
  email: string;
};

export type LoginRequest = {
  email: User["email"];
  password: string;
};

export type LoginResponse = {
  message: string;
  user: User;
  accessToken: string;
};

export type RegisterRequest = LoginRequest & { username: User["username"] };
export type RegisterResponse = LoginResponse;
