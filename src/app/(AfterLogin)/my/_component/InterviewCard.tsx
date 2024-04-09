import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface InterviewCardProps {
  videoTitle: string;
  time: string;
  numOfLike: number;
  tags: string[];
  thumbnailUrl: string;
}

const InterviewCard = ({ videoTitle, time, numOfLike, tags, thumbnailUrl }: InterviewCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{videoTitle}</CardTitle>
        <CardDescription className="text-sm text-gray-500">{time}</CardDescription>
        <Separator className="w-full my-2" />
      </CardHeader>
      <CardContent>
        <div className="mb-4 w-full rounded">
          <img src={thumbnailUrl} alt="thumbnail" className="w-full h-48 object-cover mb-4" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm text-gray-500 mr-2 bg-gray-100 rounded-lg px-2 py-1"
            >
              #{tag}
            </span>
          ))}
        </div>
        <p
          className="text-sm text-gray-500 ml-2
        
        "
        >
          좋아요 {numOfLike}개
        </p>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
