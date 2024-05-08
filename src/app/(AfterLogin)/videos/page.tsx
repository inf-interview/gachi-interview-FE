"use client";

import Link from "next/link";
import VideoCard from "./_component/VideoCard";
import { useGetInterviews } from "./_lib/queries/useInterviewQuery";

const Videos = () => {
  // TODO: infinite scroll 구현
  const page = 1;
  const { data: videoList } = useGetInterviews({ sortType: "like", page });

  if (!videoList) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-2" style={{ gap: "1rem" }}>
        <input
          placeholder="Tag Filter"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <select
          className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue="최신순"
        >
          <option>최신순</option>
          <option>인기순</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {videoList.map((video) => (
          <Link key={video.videoId} href={`/videos/${video.videoId}`} passHref>
            <VideoCard video={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Videos;
