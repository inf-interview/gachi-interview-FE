import { User } from "./User";

export interface Post {
  postId: number;
  User: User;
  postTitle: string;
  content: string;
  category: string;
  updateTime: Date;
  numOfLike: number;
  numOfComment: number;
  tags: string[];
}
