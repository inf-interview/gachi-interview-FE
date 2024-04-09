import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InterviewReview from "./_component/InterviewReview";
import GetStudy from "./_component/GetStudy";

export default function Page() {
  return (
    <Tabs defaultValue="reviews" className="w-[400px] px-10 py-5">
      <TabsList>
        <TabsTrigger value="reviews">면접 후기</TabsTrigger>
        <TabsTrigger value="studies">스터디 모집</TabsTrigger>
      </TabsList>
      <TabsContent value="reviews">
        <InterviewReview />
      </TabsContent>
      <TabsContent value="studies">
        <GetStudy />
      </TabsContent>
    </Tabs>
  );
}
