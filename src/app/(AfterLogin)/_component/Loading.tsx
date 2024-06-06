import dynamic from "next/dynamic";
import loading from "../../../../public/loading.json";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie play animationData={loading} className="m-20 w-1/4 h-1/4" />
    </div>
  );
};

export default Loading;
