import dynamic from "next/dynamic";
import no_data from "../../../../public/no_data.json";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

interface NoDataProps {
  message?: string;
}

const NoData = ({ message }: NoDataProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie play animationData={no_data} className="m-20 w-1/4 h-1/4" />
      <p className="text-2xl font-bold text-gray-700">텅!</p>
      <p>{message || "컨텐츠가 아직 등록되지 않았네요...😰"}</p>
    </div>
  );
};

export default NoData;
