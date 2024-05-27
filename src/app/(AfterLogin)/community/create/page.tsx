"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewPostForm from "./_component/ReviewPostForm";
import StudyPostForm from "./_component/StudyPostForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const tabParams = useSearchParams().get("tab") || undefined;
  const router = useRouter();

  const handleTabClick = (value: string) => {
    router.replace(`/community/create?tab=${value}`);
  };

  return (
    <Tabs defaultValue={tabParams} className="w-full">
      <TabsList>
        <TabsTrigger value="reviews" onClick={() => handleTabClick("reviews")}>
          면접 후기
        </TabsTrigger>
        <TabsTrigger value="studies" onClick={() => handleTabClick("studies")}>
          스터디 모집
        </TabsTrigger>
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
