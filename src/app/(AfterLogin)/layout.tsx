import Link from "next/link";
import { ReactNode } from "react";
import { SlCamrecorder } from "react-icons/sl";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function AfterLoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <div className="flex min-h-screen">
        <div className="flex flex-col justify-between w-64 bg-white shadow-lg">
          <div className="flex items-center justify-center h-20 bg-gray-100 text-black font-bold text-xl">
            <img src="/logo.png" alt="logo" className="w-20" />
          </div>
          <nav className="flex flex-col flex-1">
            <Link
              href="/interview/setting"
              className="flex items-center py-4 px-6 text-sm text-black hover:bg-gray-200 hover:text-gray-700"
            >
              <SlCamrecorder className="mr-4" />
              영상 녹화
            </Link>
            <Link
              href="/videos"
              className="flex items-center py-4 px-6 text-sm text-black hover:bg-gray-200 hover:text-gray-700"
            >
              <MdOutlinePlaylistPlay className="mr-4" />
              면접 영상 목록
            </Link>
            <Link
              href="/community?tab=reviews"
              className="flex items-center py-4 px-6 text-sm text-black hover:bg-gray-200 hover:text-gray-700"
            >
              <MdGroups className="mr-4" />
              커뮤니티
            </Link>
            <Link
              href="/my?tab=videos"
              className="flex items-center py-4 px-6 text-sm text-black hover:bg-gray-200 hover:text-gray-700"
            >
              <CgProfile className="mr-4" />
              마이페이지
            </Link>
          </nav>
        </div>
      </div>
      <div className="mt-20 px-4 w-full">{children}</div>
    </div>
  );
}
