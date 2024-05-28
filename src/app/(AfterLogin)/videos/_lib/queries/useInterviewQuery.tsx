import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getInterviews, { getInterviewsProps as RequestGetInterviews } from "../api/getInterviews";
import getInterview, { getInterviewProps as RequestGetInterview } from "../api/getInterview";
import postLike, { postLikeProps } from "../api/postLike";

type ResponseGetInterviews = {
  content: {
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
};

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

interface RequestPostLike extends postLikeProps {
  queryKeyPrefix: string[];
}

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation<null, Error, RequestPostLike>({
    mutationFn: (data) => postLike(data),
    onMutate: async (data) => {
      const queryKey = [...data.queryKeyPrefix, data.id];
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: any) => {
        return {
          ...old,
          numOfLike: old.numOfLike + 1,
        };
      });
      return { previousData };
    },
  });
};
