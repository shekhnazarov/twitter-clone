import { Feather } from "lucide-react";
import Link from "next/link";
import React from "react";

const SidebarPostButton = () => {
  return (
    <Link href={"/"}>
      {/* Mobile post */}
      <div className="mt-6 relative rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-10 cursor-pointer transition lg:hidden">
        <Feather size={24} color="white" />
      </div>
      {/* Desktop post */}
      <div className="mt-6 relative rounded-full px-4 py-2 hidden items-center justify-center bg-sky-500 hover:bg-opacity-90 cursor-pointer transition lg:block">
        <p className="text-center font-semibold text-white text-[20px]">POST</p>
      </div>
    </Link>
  );
};

export default SidebarPostButton;
