import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils/days";
import { useState } from "react";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../_lib/queries/useCommentQuery";
import { useModal } from "@/components/Modal/useModal";
import Modal from "@/components/Modal";
import { PiPencil } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { userIdState } from "@/store/auth";

interface CommentProps {
  comment: {
    commentId: number;
    userId: number;
    username: string;
    content: string;
    createdAt: string;
    image: string;
  };
  videoId: string;
}

const Comment = ({ comment, videoId }: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { openModal, closeModal } = useModal();
  const [editedComment, setEditedComment] = useState(comment.content);
  const { mutate: updateComment } = useUpdateCommentMutation(videoId);
  const { mutate: deleteComment } = useDeleteCommentMutation(videoId);
  const userId = useRecoilValue(userIdState);

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
        disableBackdropClick={false}
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={closeModal} variant="outline">
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
    <div id={comment.commentId.toString()} className="flex flex-col px-4 py-2 comment">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full object-cover"
          // TODO: 이미지 경로 수정
          src={comment.image}
          alt="프로필 이미지"
        />
        <div className="flex flex-col ml-4">
          <span className="font-bold">{comment.username}</span>
          <span className="text-gray-500">{formatRelativeTime(comment.createdAt)}</span>
        </div>

        {comment.userId === userId && isEditing == false && (
          <div className="flex justify-end mt-2 gap-2 ml-auto">
            <Button onClick={handleEdit} variant="link" className="text-gray-600">
              <PiPencil className="mr-1" />
              수정
            </Button>
            <Button onClick={handleOpenDeleteModal} variant="link" className="text-red-500">
              <RiDeleteBinLine className="mr-1" />
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
            className="w-full h-20 mt-4 p-4 rounded-lg border border-gray-300"
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button onClick={() => setIsEditing(false)} variant="outline">
              취소
            </Button>
            <Button type="submit" variant="default">
              등록
            </Button>
          </div>
        </form>
      ) : (
        <p className="mt-4 whitespace-pre-wrap">{comment.content}</p>
      )}
      <hr className="mt-4" />
    </div>
  );
};

export default Comment;
