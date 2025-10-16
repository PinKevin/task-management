export interface LoginDto {
  username?: string;
  password?: string;
}

export interface RegisterDto {
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterResponse {
  name: string;
  username: string;
}
