import { useState } from "react";
import CommentForm from "@/app/(AfterLogin)/_component/CommentForm";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/model/Post";
import { AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { formatRelativeTime } from "@/lib/utils/days";
import { Button } from "@/components/ui/button";
import "./PostDetail.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { accessTokenState, userIdState } from "@/store/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import postLike from "../_lib/postLike";
import { toast } from "react-toastify";
import { PiPencil } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from "@/components/Modal";
import { useModal } from "@/components/Modal/useModal";
import deletePost from "../_lib/deletePost";
import { useRouter } from "next/navigation";

export default function PostDetail({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [animate, setAnimate] = useState(false);
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenState);
  const userId = useRecoilValue(userIdState);
  const postId = post.postId;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (params: { userId: number; postId: string; accessToken: string }) =>
      postLike(params),
    onMutate: async () => {
      const queryKey = ["community", postId.toString()];
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: { numOfLike: number; liked: boolean }) => {
        return {
          ...old,
          numOfLike: old.numOfLike,
          liked: old.liked,
        };
      });
      return { previousData };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["community", postId.toString()],
        (old: { numOfLike: number; liked: boolean }) => ({
          ...old,
          numOfLike: data.numOfLike,
          liked: data.liked,
        }),
      );
    },
  });

  const removePost = useMutation({
    mutationKey: ["community", postId],
    mutationFn: (removedPost: { userId: number; postId: string }) => deletePost(removedPost),
    onMutate: async (removedPost) => {
      const previousData = queryClient.getQueryData(["community", postId]);
      if (!previousData) return;

      queryClient.setQueryData(["community", postId], (old: Post[]) => {
        return old.filter((post: { postId: string }) => post.postId !== removedPost.postId);
      });
      return { previousData };
    },
  });

  const handleLike = () => {
    if (!isLiked) {
      mutate({
        userId,
        postId,
        accessToken,
      });
      setIsLiked(true);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    } else {
      mutate({
        userId,
        postId,
        accessToken,
      });
      setIsLiked(false);
    }
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info("클립보드에 복사되었습니다.", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (e) {
      toast.error("복사에 실패하였습니다.");
    }
  };

  const handleDeletePost = () => {
    removePost.mutate({
      userId,
      postId,
    });
    closeModal();
    router.push(`/community?tab=${post.category}`);
  };

  const handleOpenDeleteModal = () => {
    openModal(
      <Modal
        header="게시글 삭제"
        disableBackdropClick={false}
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={closeModal} variant="outline">
              취소
            </Button>
            <Button onClick={handleDeletePost} variant="destructive">
              삭제
            </Button>
          </div>
        }
      >
        <p>정말로 삭제하시겠습니까?</p>
      </Modal>,
    );
  };

  return (
    <div className="flex-col">
      <div className="px-6 pt-4 pb-2 mb-5 border border-gray-300 rounded-md">
        <span className="text-2xl font-bold">{post.postTitle}</span>
        <hr className="mt-2" />
        <div className="flex">
          <p className="my-5 pb-8 whitespace-pre-line">{post.content}</p>
          {post.userId == userId && (
            <div className="flex justify-end mt-2 ml-auto">
              <Button
                onClick={() =>
                  router.push(`/community/edit?tab=${post.category}&id=${post.postId}`)
                }
                variant="link"
                className="text-gray-600"
              >
                <PiPencil />
                수정
              </Button>
              <Button onClick={handleOpenDeleteModal} variant="link" className="text-red-500">
                <RiDeleteBinLine />
                삭제
              </Button>
            </div>
          )}
        </div>
        {post.tag.map((tag, index) => (
          <Badge
            key={index}
            className={`px-3 py-1 text-sm ${index === 0 ? "-ml-2" : "mx-1"}`}
            variant="secondary"
          >
            #{tag}
          </Badge>
        ))}
        <div className="flex my-3">
          <div className="flex items-center flex-1 mt-2">
            {post.image ? (
              <img src={post.image} alt="프로필이미지" className="w-5 h-5 rounded-full" />
            ) : (
              <Image
                src="data:image/jpeg;base64,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"
                alt="프로필이미지"
                className="rounded-full"
                width={20}
                height={20}
              />
            )}
            <p className="text-gray-600 text-sm ml-2">
              <span className="font-semibold">{post.userName}</span> •{" "}
              {formatRelativeTime(post.time.toLocaleString())}
            </p>
          </div>
          <div className="flex">
            <div className="flex items-center w-full justify-center">
              <Button
                variant="outline"
                onClick={handleLike}
                className={`${animate ? "animate-ping" : ""}`}
              >
                <AiOutlineLike className={`mr-1 ${isLiked ? "text-green-500" : "text-gray-500"}`} />
                <span
                  className={`text-sm ${
                    isLiked ? "text-green-500 font-semibold" : "text-gray-700"
                  }`}
                >
                  {post.numOfLike}
                </span>
              </Button>
              <Button
                variant="outline"
                className="ml-2"
                onClick={() => handleCopyClipBoard(window.location.href)}
              >
                <AiOutlineShareAlt className="mr-2" />
                공유
              </Button>
            </div>
            <div className="flex items-center ml-3">
              <FaRegComment className="text-gray-500 mr-1" />
              <span className="text-gray-700 text-sm">{post.numOfComment}</span>
            </div>
          </div>
        </div>
      </div>
      <CommentForm postId={post.postId} />
    </div>
  );
}
