import Modal from "@/components/Modal";
import { useModal } from "@/components/Modal/useModal";
import { Button } from "@/components/ui/button";
import { localDownload } from "@/lib/utills/record";
import { useRouter } from "next/navigation";

interface UploadCompletionModalProps {
  encodedBlob: Blob;
  isPublic: boolean;
}

const UploadCompletionModal = ({ encodedBlob, isPublic }: UploadCompletionModalProps) => {
  const router = useRouter();
  const { closeModal } = useModal();

  const handleDownload = () => {
    localDownload(encodedBlob);
  };

  // TODO: 클립보드에 복사하는 기능 추가
  const handleCopyLink = () => {
    console.log("copy to clipboard");
    alert("클립보드에 복사되었습니다.");
  };

  // TODO: 영상이 public-> 영상 목록의 해당 비디오 게시물로 이동, 비공개-> 마이페이지로 이동
  const handleMoveToVideoDetail = () => {
    if (isPublic) {
      closeModal();
      router.push("/videos/");
      return;
    }
    router.push("/my?tab=videos");
    closeModal();
  };

  return (
    <Modal
      disableBackdropClick={true}
      header="업로드 완료"
      footer={<Button onClick={handleMoveToVideoDetail}>확인하러 가기</Button>}
    >
      <p>비디오 인코딩이 완료되었어요</p>
      <p>🤖 AI 영상 분석이 완료되면 알림을 보내드릴게요!</p>
      영상을 기기에 다운로드 하시고 싶으시면 아래 버튼을 눌러주세요.
      <br />
      <div>
        <Button onClick={handleDownload}>다운로드</Button>
        <Button onClick={handleCopyLink}>영상 링크 공유하기</Button>
      </div>
    </Modal>
  );
};

export default UploadCompletionModal;
