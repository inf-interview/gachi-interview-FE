import { Post } from "@/model/Post";

export default function Comment({ comment }: { comment: Post }) {
  return (
    <div className="flex flex-col w-2/3 my-5 p-4 border border-gray-300 rounded-md">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="https://file.mk.co.kr/meet/neds/2020/03/image_readtop_2020_256728_15839167074119784.jpg"
          alt="프로필 이미지"
        />
        <div className="flex flex-col ml-4">
          <span className="font-bold">{comment.User.userName}</span>
          <span className="text-gray-500">{comment.updateTime.toLocaleString()}</span>
        </div>
      </div>
      <p className="mt-2">{comment.content}</p>
    </div>
  );
}
