"use client";

import VideoCard from "./_component/VideoCard";
import { useGetInterviews } from "./_lib/queries/useInterviewQuery";
import { useEffect, useState } from "react";
import NoData from "../_component/NoData";
import Loading from "../_component/Loading";
import FilterTag from "../_component/FilterTag";
import { Video } from "@/model/Video";
import { Post } from "@/model/Post";

const Videos = () => {
  const page = 1;
  const [sortType, setSortType] = useState<"new" | "like">("new");
  const { data: videoList } = useGetInterviews({ sortType: sortType, page });
  const [filteredVideoList, setFilteredVideoList] = useState<Video[]>(videoList?.content || []);

  useEffect(() => {
    if (videoList?.content) {
      setFilteredVideoList(videoList.content);
    }
  }, [videoList]);

  const handleSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as "new" | "like");
  };

  const handleFilterChange = (filteredList: (Video | Post)[]) => {
    setFilteredVideoList(filteredList as Video[]);
  };

  if (!videoList) {
    return <Loading />;
  }

  if (videoList.content?.length === 0) {
    return <NoData />;
  }

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-2" style={{ gap: "1rem" }}>
        <FilterTag originalList={videoList.content} onFilterChange={handleFilterChange} />
        <select
          className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue="최신순"
          onChange={handleSortType}
        >
          <option value="new">최신순</option>
          <option value="like">인기순</option>
        </select>
      </div>

      {filteredVideoList.length === 0 && <NoData />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredVideoList.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Videos;
