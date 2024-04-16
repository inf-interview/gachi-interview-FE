"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewPostForm from "./_component/ReviewPostForm";
import StudyPostForm from "./_component/StudyPostForm";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const tabParams = useSearchParams().get("tab") || undefined;
  return (
    <Tabs defaultValue={tabParams} className="w-full">
      <TabsList>
        <Link href="/community/create?tab=reviews">
          <TabsTrigger value="reviews">면접 후기</TabsTrigger>
        </Link>
        <Link href="/community/create?tab=studies">
          <TabsTrigger value="studies">스터디 모집</TabsTrigger>
        </Link>
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
