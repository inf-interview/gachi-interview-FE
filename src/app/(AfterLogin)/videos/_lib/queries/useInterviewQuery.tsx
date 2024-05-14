import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getInterviews, { getInterviewsProps as RequestGetInterviews } from "../api/getInterviews";
import getInterview, { getInterviewProps as RequestGetInterview } from "../api/getInterview";
import postLike, { postLikeProps as RequestPostLike } from "../api/postLike";

type ResponseGetInterviews = {
  userId: number;
  userName: string;
  videoId: number;
  videoLink: string;
  videoTitle: string;
  thumbnailLink: string;
  time: string;
  updateTime: string | null;
  numOfLike: number;
  tags: string[];
}[];

export const useGetInterviews = ({ sortType, page }: RequestGetInterviews) => {
  return useQuery<ResponseGetInterviews, Error, ResponseGetInterviews, [string, string, number]>({
    queryKey: ["interviews", sortType, page],
    queryFn: () => getInterviews({ sortType, page }),
  });
};

type ResponseGetInterview = {
  userId: number;
  userName: string;
  videoId: number;
  videoLink: string;
  videoTitle: string;
  time: string;
  updateTime: string | null;
  numOfLike: number;
  tags: string[];
  exposure: boolean;
};

export const useGetInterview = (videoId: RequestGetInterview) => {
  return useQuery<ResponseGetInterview, Error, ResponseGetInterview, [string, string]>({
    queryKey: ["interview", videoId],
    queryFn: () => getInterview(videoId),
  });
};

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation<null, Error, RequestPostLike>({
    mutationFn: (data) => postLike(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["interview", data.videoId] });
      const previousData = queryClient.getQueryData(["interview", data.videoId]);
      queryClient.setQueryData(["interview", data.videoId], (old: ResponseGetInterview) => {
        return {
          ...old,
          numOfLike: old.numOfLike + 1,
        };
      });
      return { previousData };
    },
  });
};
