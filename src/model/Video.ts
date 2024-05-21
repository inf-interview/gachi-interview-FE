import { User } from "./User";

export interface Video {
  videoId: number;
  userId: number;
  videoTitle: string;
  videoLink: string;
  thumbnailLink: string;
  numOfLike: number;
  time: string;
  tags: string[];
  userName: string;
  // User: User;
}
