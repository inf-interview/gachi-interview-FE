import { useState, useCallback, useEffect } from "react";
import debounce from "../_lib/debounce";
import { Post } from "@/model/Post";
import { Video } from "@/model/Video";
import { CiSearch } from "react-icons/ci";

interface FilterTagProps {
  originalList: (Video | Post)[] | undefined;
  onFilterChange: (filteredList: (Video | Post)[]) => void;
}

function isVideo(item: Video | Post): item is Video {
  return (item as Video).tags !== undefined;
}

const FilterTag: React.FC<FilterTagProps> = ({ originalList, onFilterChange }) => {
  const [filteredList, setFilteredList] = useState<(Video | Post)[] | undefined>(originalList);

  const handleFilterTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFilterTag(e.target.value);
  };

  const debouncedFilterTag = useCallback(
    debounce((value: string) => {
      console.log(value);
      const newFilteredList = originalList
        ? originalList.filter((item) => {
            if (isVideo(item)) {
              const tags = item.tags || [];
              return value ? tags.some((t: string) => t.includes(value)) : true;
            } else {
              const tag = item.tag || [];
              return value ? tag.some((t: string) => t.includes(value)) : true;
            }
          })
        : [];

      setFilteredList(newFilteredList);
      onFilterChange(newFilteredList);
      return value;
    }, 300),
    [originalList],
  );

  useEffect(() => {
    setFilteredList(originalList);
  }, [originalList]);

  return (
    <div className="relative flex items-center w-full">
      <CiSearch className="absolute left-3 text-muted-foreground" />
      <input
        placeholder="태그로 검색"
        className="h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none"
        onChange={handleFilterTag}
      />
    </div>
  );
};

export default FilterTag;
