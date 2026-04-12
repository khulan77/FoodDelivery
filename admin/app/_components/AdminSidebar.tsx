"use client";

import { cn } from "@/lib";
import { LogOut } from "lucide-react";
import { logout } from "@/services/auth";
import { ADMIN_SIDEBAR_MENUS } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

const publicPath = ["/login", "/signup"];

export const AdminSidebar = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  if (publicPath.includes(pathname)) return null;

  const handleClickMenu = (path: string) => () => push(path);

  const handleLogout = () => {
    logout();
    push("/login");
  };

  return (
    <div className="w-55 flex flex-col justify-between h-screen bg-slate-100 border-r border-slate-200">
      <div>
        <div className="px-6 py-3 border-b border-slate-200">
          <div className="flex items-center gap-1 font-bold text-xl select-none">Food Admin</div>
        </div>

        <div className="px-6 pt-6 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Navigation</p>
        </div>

        <nav className="px-3 space-y-1">
          {ADMIN_SIDEBAR_MENUS.map(({ value, path, Icon }, index) => {
            const isActive = pathname === path;

            return (
              <div
                key={index}
                onClick={handleClickMenu(path)}
                className={cn(
                  "flex gap-3 px-4 py-2.5 items-center cursor-pointer rounded-lg transition-all duration-150 group",
                  isActive ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:bg-slate-200 hover:text-slate-800",
                )}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={cn("shrink-0 transition-colors", isActive ? "text-slate-800" : "text-slate-400 group-hover:text-slate-600")}
                />

                <p className={cn("text-sm font-medium", isActive ? "text-slate-900" : "")}>{value}</p>

                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-800" />}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="px-3 pb-6 border-t border-slate-200 pt-4">
        <div
          onClick={handleLogout}
          className="flex gap-3 px-4 py-2.5 items-center cursor-pointer rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150 group"
        >
          <LogOut size={18} strokeWidth={1.5} className="shrink-0 group-hover:text-red-500" />
          <p className="text-sm font-medium">Logout</p>
        </div>
      </div>
    </div>
  );
};
