export interface User {
  username: string;
  email: string;
  bio: string;
  image: string;
  token: string;
}

export interface UserResponse {
  user: User;
}
