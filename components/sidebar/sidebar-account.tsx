import { IUser } from "@/types";
import { signOut } from "next-auth/react";
import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  user: IUser;
}

const SidebarAccount = ({ user }: Props) => {
  return (
    <>
      {/* Mobile sidebar account */}
      <div className="block lg:hidden">
        <div
          className="mt-6 relative rounded-full h-14 w-14 p-4 flex items-center justify-center bg-red-500 hover:bg-opacity-80 cursor-pointer transition lg:hidden"
          onClick={() => signOut()}
        >
          <RiLogoutCircleLine size={24} color="white" />
        </div>
      </div>

      {/* Desktop sidebar account */}
      <Popover>
        <PopoverTrigger className="w-full rounded-full hover:bg-slate-300 hidden lg:block cursor-pointer hover:bg-opacity-10 px-4 py-2 transition">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-white">
                <p>{user?.name}</p>
                <p className="opacity-40">
                  {user?.username || "Manage account"}
                </p>
              </div>
            </div>
            <MoreHorizontal size={24} color="white" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-black border-none rounded-2xl shadow shadow-white px-0 mb-3">
          <div
            className="font-bold text-white cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 p-4 transition"
            onClick={() => signOut()}
          >
            Log out {user?.username ? `@${user?.username}` : user.name}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SidebarAccount;
