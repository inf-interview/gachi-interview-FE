import { User } from "./User";

export interface Post {
  postId: number;
  User: User;
  postTitle: string;
  postContent: string;
  category: string;
  updateTime: Date;
  numOfLike: number;
  numOfComment: number;
  tags: string[];
}
