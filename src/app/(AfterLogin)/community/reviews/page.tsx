import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InterviewReview from "./_component/InterviewReview";
import GetStudy from "./_component/GetStudy";
import { Button } from "@/components/ui/button";
import { BsPlusCircle } from "react-icons/bs";
import Link from "next/link";

export default function Page() {
  return (
    <Tabs defaultValue="reviews" className="w-full px-10 py-5">
      <div className="flex">
        <div className="flex-1">
          <TabsList>
            <TabsTrigger value="reviews">면접 후기</TabsTrigger>
            <TabsTrigger value="studies">스터디 모집</TabsTrigger>
          </TabsList>
        </div>
        <Link href="/community/create">
          <Button>
            <BsPlusCircle className="mr-2" />
            글쓰기
          </Button>
        </Link>
      </div>
      <TabsContent
        value="reviews"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4"
      >
        <InterviewReview />
        <InterviewReview />
        <InterviewReview />
        <InterviewReview />
        <InterviewReview />
      </TabsContent>
      <TabsContent
        value="studies"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4"
      >
        <GetStudy />
        <GetStudy />
        <GetStudy />
        <GetStudy />
        <GetStudy />
      </TabsContent>
    </Tabs>
  );
}
