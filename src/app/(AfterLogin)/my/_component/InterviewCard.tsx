import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AiOutlineLike } from "react-icons/ai";

interface InterviewCardProps {
  videoTitle: string;
  time: string;
  numOfLike: number;
  tags: string[];
  thumbnailUrl: string;
}

const InterviewCard = ({ videoTitle, time, numOfLike, tags, thumbnailUrl }: InterviewCardProps) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{videoTitle}</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <img src={thumbnailUrl} alt="thumbnail" className="w-full h-40 object-cover" />
      </CardContent>
      <CardFooter className="flex-col items-start justify-start">
        <div className="flex flex-wrap mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} className="mt-2 px-3 py-1 text-sm mr-1" variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="flex w-full justify-between items-center">
          <p className="text-gray-600 text-sm mt-2">{time}</p>
          <div className="flex mt-2">
            <div className="flex items-center">
              <AiOutlineLike className="text-gray-500 mr-1" />
              <span className="text-gray-700">{numOfLike}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
