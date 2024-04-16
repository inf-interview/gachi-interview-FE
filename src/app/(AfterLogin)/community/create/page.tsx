import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewPostForm from "./_component/ReviewPostForm";
import StudyPostForm from "./_component/StudyPostForm";

export default function Page() {
  return (
    <Tabs defaultValue="reviews">
      <TabsList>
        <TabsTrigger value="reviews">면접 후기</TabsTrigger>
        <TabsTrigger value="studies">스터디 모집</TabsTrigger>
      </TabsList>
      <TabsContent value="reviews">
        <ReviewPostForm />
      </TabsContent>
      <TabsContent value="studies">
        <StudyPostForm />
      </TabsContent>
    </Tabs>
  );
}
