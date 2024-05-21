// import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { AiOutlineLike } from "react-icons/ai";

// interface InterviewCardProps {
//   videoTitle: string;
//   time: string;
//   numOfLike: number;
//   tags: string[];
//   thumbnailUrl: string;
// }

// const InterviewCard = ({ videoTitle, time, numOfLike, tags, thumbnailUrl }: InterviewCardProps) => {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader>
//         <CardTitle>{videoTitle}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-center rounded-lg overflow-hidden">
//           <img src={thumbnailUrl} alt="thumbnail" className="w-full h-40 object-cover" />
//         </div>
//         <div className="flex flex-wrap my-4">
//           {tags.map((tag, index) => (
//             <Badge key={index} className="mt-1 px-3 py-1 text-sm mr-1" variant="secondary">
//               #{tag}
//             </Badge>
//           ))}
//         </div>
//       </CardContent>
//       <CardFooter className="flex-row items-center mt-auto justify-between">
//         <p className="text-gray-600 text-sm">{time}</p>
//         <div className="flex mt-2">
//           <div className="flex items-center">
//             <AiOutlineLike className="text-gray-500 mr-1" />
//             <span className="text-gray-700">{numOfLike}</span>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default InterviewCard;
