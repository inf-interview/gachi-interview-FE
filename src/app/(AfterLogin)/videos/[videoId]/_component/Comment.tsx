import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utills/days";
import { useState } from "react";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../_lib/queries/useCommentQuery";
import { useModal } from "@/components/Modal/useModal";
import Modal from "@/components/Modal";

interface CommentProps {
  comment: {
    commentId: number;
    userId: number;
    userName: string;
    content: string;
    createdAt: string;
  };
  videoId: string;
}

const Comment = ({ comment, videoId }: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { openModal, closeModal } = useModal();
  const [editedComment, setEditedComment] = useState(comment.content);
  const { mutate: updateComment } = useUpdateCommentMutation(videoId);
  const { mutate: deleteComment } = useDeleteCommentMutation(videoId);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateComment({
      userId: comment.userId,
      commentId: comment.commentId,
      content: editedComment,
      videoId,
    });
    setIsEditing(false);
  };

  const handleDeleteComment = () => {
    deleteComment({
      userId: comment.userId,
      commentId: comment.commentId,
      videoId,
    });

    closeModal();
  };

  const handleOpenDeleteModal = () => {
    openModal(
      <Modal
        header="댓글 삭제"
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={closeModal} variant="ghost">
              취소
            </Button>
            <Button onClick={handleDeleteComment} variant="destructive">
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
    <div className="flex flex-col mt-4">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full object-cover"
          // TODO: 이미지 경로 수정
          src="https://file.mk.co.kr/meet/neds/2020/03/image_readtop_2020_256728_15839167074119784.jpg"
          alt="프로필 이미지"
        />
        <div className="flex flex-col ml-4">
          <span className="font-bold">{comment.userName}</span>
          <span className="text-gray-500">{formatRelativeTime(comment.createdAt)}</span>
        </div>

        {comment.userId === 1 && (
          <div className="flex justify-end mt-2 gap-2 ml-auto">
            <Button onClick={handleEdit} variant="ghost">
              수정
            </Button>
            <Button onClick={handleOpenDeleteModal} variant="ghost">
              삭제
            </Button>
          </div>
        )}
      </div>
      {isEditing ? (
        <form onSubmit={handleUpdateComment}>
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="w-full h-32 mt-4 p-4 rounded-lg border border-gray-300"
          />
          <Button className="float-end" type="submit">
            수정
          </Button>
        </form>
      ) : (
        <p className="mt-4">{comment.content}</p>
      )}
      <hr className="mt-4" />
    </div>
  );
};

export default Comment;
