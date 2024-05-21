import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type metadata = {
  title: string;
  tags: string[];
  thumbnail: Blob;
  public: boolean;
};

interface VideoMetadataModalProps {
  thumbnails: Blob[];
  disableBackdropClick?: boolean;
  onSubmit: (metadata: metadata) => void;
}

const VideoMetadataModal = ({ thumbnails, onSubmit }: VideoMetadataModalProps) => {
  const [error, setError] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<metadata>({
    title: "",
    tags: [],
    thumbnail: thumbnails[0],
    public: true,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata({ ...metadata, title: e.target.value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setMetadata({ ...metadata, tags });
  };

  const handleThumbnailChange = (thumbnail: Blob) => {
    setMetadata({ ...metadata, thumbnail });
  };

  const handlePublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata({ ...metadata, public: e.target.checked });
  };

  const validateMetadata = () => {
    if (metadata.title === "") {
      setError("제목을 입력해주세요.");
      return false;
    }

    if (metadata.thumbnail === null) {
      setError("썸네일을 선택해주세요.");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateMetadata()) return;
    setIsTouched(true);
    onSubmit(metadata);
  };

  const thumbnailsURL = useMemo(
    () => thumbnails.map((thumbnail) => URL.createObjectURL(thumbnail)),
    [thumbnails],
  );

  // TODO: memory leak 해결하기
  useEffect(() => {
    console.log(thumbnailsURL);
    return () => {
      console.log("cleanup");
      // thumbnailsURL.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <Modal
      header={
        <>
          <p>영상을 열심히 분석 하고 있어요! 🎬</p>
          <p>서버에 업로드 하기 전 간단한 설정을 도와주세요.</p>
        </>
      }
      footer={
        <Button disabled={!metadata.title || !metadata.thumbnail} onClick={handleSubmit}>
          {isTouched ? "업로드 중..." : "업로드 하기"}
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <span className="block text-basic text-muted-foreground mb-2">메타데이터 설정</span>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="제목을 입력하세요."
          value={metadata.title}
          onChange={handleTitleChange}
        />
        {error && <span className="block text-sm text-red-500 mt-2">{error}</span>}

        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
          type="text"
          placeholder="태그를 입력하세요. (쉼표로 구분)"
          value={metadata.tags.join(",")}
          onChange={handleTagsChange}
        />

        <div className="flex flex-col gap-4 mt-4">
          <label>
            <span className="block text-basic text-muted-foreground">썸네일 선택</span>
          </label>
          <div className="flex gap-4 overflow-x-scroll relative">
            {thumbnails.map((thumbnail, index) => (
              <Image
                width={100}
                height={100}
                key={index}
                src={thumbnailsURL[index]}
                alt="썸네일"
                onClick={() => handleThumbnailChange(thumbnail)}
                className={`cursor-pointer w-48 h-32 object-cover rounded-lg border-2 ${
                  metadata.thumbnail === thumbnail && "border-2 border-primary"
                }`}
              />
            ))}
          </div>

          <span className="block text-basic text-muted-foreground">공개 여부</span>
          <label
            htmlFor="public"
            className="inline-flex items-center gap-2 cursor-pointer flex-row justify-between"
          >
            <input
              id="public"
              role="switch"
              type="checkbox"
              checked={metadata.public}
              onChange={handlePublicChange}
              className="peer sr-only"
            />
            <span className="block text-sm text-muted-foreground select-none">
              {metadata.public
                ? "(면접 리스트 페이지에서) 모두가 볼 수 있어요."
                : "(마이페이지에서) 나만 볼 수 있어요."}
            </span>
            <span
              className={`peer h-5 w-9 rounded-full bg-input transition-colors ${
                metadata.public ? "bg-primary" : ""
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-slate-300 shadow-sm transform transition-transform ${
                  metadata.public ? "translate-x-4 bg-slate-400" : ""
                }`}
              />
            </span>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default VideoMetadataModal;
