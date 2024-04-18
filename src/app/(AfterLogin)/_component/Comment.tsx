export default function Comment() {
  return (
    // <div className="w-2/3 m-5 p-4 border border-gray-300 rounded-md">
    //   <span>성 이름</span>
    //   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
    // </div>
    <div className="flex flex-col w-2/3 my-5 p-4 border border-gray-300 rounded-md">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="https://file.mk.co.kr/meet/neds/2020/03/image_readtop_2020_256728_15839167074119784.jpg"
          alt="프로필 이미지"
        />
        <div className="flex flex-col ml-4">
          <span className="font-bold">이영재</span>
          <span className="text-gray-500">3분 전</span>
        </div>
      </div>
      <p className="mt-2">잘했어요!</p>
    </div>
  );
}
