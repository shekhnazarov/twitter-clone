import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const User = () => {
  return (
    <div className="flex gap-3 items-center justify-between cursor-pointer hover:bg-neutral-300/30 hover:bg-opacity-10 transition py-2 px-3 rounded-md">
      <div className="flex cursor-pointer gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-col">
          <p className="text-white font-semibold text-sm line-clamp-1">Umar</p>
          <p className="text-neutral-400 text-sm line-clamp-1">@umar9151</p>
        </div>
      </div>
    </div>
  );
};

export default User;
