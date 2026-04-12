"use client";

import Image from "next/legacy/image";
import { useContext } from "react";
import { LogOut } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserContext } from "../../context";

type HeaderUserProfileIconProps = {
  profileImage?: string;
};

export const HeaderUserProfileIcon = ({
  profileImage = "https://i.pinimg.com/736x/b2/b1/97/b2b197e5f03fc839ce36ffef82cfcf80.jpg",
}: HeaderUserProfileIconProps) => {
  const { user, logout } = useContext(UserContext);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <div className="relative overflow-hidden rounded-full h-9 w-9">
            <Image
              src={profileImage}
              alt="cover_img"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-48 p-2">
        {user && (
          <div className="px-2 py-1.5 mb-1 border-b">
            <p className="text-sm font-medium truncate">{user.name ?? user.email}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Log out
        </button>
      </PopoverContent>
    </Popover>
  );
};
