import { Profile } from './profile';

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}

export interface CommentRequest {
  comment: {
    body: string;
  };
}

export interface CommentResponse {
  comment: Comment;
}
export interface CommentsResponse {
  comments: Comment[];
}
