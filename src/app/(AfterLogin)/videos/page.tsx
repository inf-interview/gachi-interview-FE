"use client";

import VideoCard from "./_component/VideoCard";
import { useGetInterviews } from "./_lib/queries/useInterviewQuery";
import { useState } from "react";
import debounce from "./_lib/utills/debounce";
import NoData from "../_component/NoData";
import Loading from "../_component/Loading";

const Videos = () => {
  // TODO: infinite scroll 구현
  const page = 1;
  // TODO: sortType 백엔드랑 맞추기 like, new?
  const [sortType, setSortType] = useState<"new" | "like">("new");
  const { data: videoList } = useGetInterviews({ sortType: sortType, page });
  const [filterTag, setFilterTag] = useState<string>("");

  const handleSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as "new" | "like");
  };

  // TODO: Filter tag 구현
  // debounce 사용, Memoization 사용

  if (!videoList) {
    return <Loading />;
  }

  if (videoList.content?.length === 0) {
    return <NoData />;
  }

  const handleFilterTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTag(e.target.value);
  };
  const debouncedFilterTag = debounce(handleFilterTag, 300);

  const filteredVideoList = videoList.content?.filter((video) => {
    if (!filterTag) return true;
    return video.tags.includes(filterTag);
  });

  if (!filteredVideoList) {
    return <NoData />;
  }

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-2" style={{ gap: "1rem" }}>
        <input
          placeholder="Tag Filter"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onChange={debouncedFilterTag}
        />
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
