import { User } from "./User";

export interface Comment {
  postId?: string;
  videoId?: number | string;
  commentId: number;
  User: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
