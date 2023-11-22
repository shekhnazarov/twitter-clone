import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  label: string;
  icon: LucideIcon;
}

const SidebarItem = ({ icon: Icon, label }: Props) => {
  return (
    <div className="flex flex-row items-center">
      {/* MOBILE SIDEBAR ITEM */}
      <div className="relative rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>

      {/* DESKTOP SIDEBAR ITEM */}
      <div className="hidden rounded-full gap-4 p-4 items-center justify-center hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:flex">
        <Icon size={24} color="white" />
        <p className="text-xl text-white">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
