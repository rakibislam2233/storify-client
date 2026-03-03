"use client";

import Logo from "@/components/Shared/Navbar/Logo";
import { Folder } from "@/interface/file.interface";
import { cn } from "@/lib/utils";
import { getRootFolders } from "@/services/folder.service";
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  Folder as FolderIcon,
  FolderOpen,
  HelpCircle,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const UserSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) => {
  const pathname = usePathname();
  const [isMyFilesOpen, setIsMyFilesOpen] = useState(true);
  const [rootFolders, setRootFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await getRootFolders();
        if (res.success) {
          setRootFolders(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch root folders", err);
      }
    };
    fetchFolders();
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/user" },
    {
      name: "My Folders",
      icon: FolderOpen,
      href: "/dashboard/user/my-folders",
    },
    {
      name: "Subscription",
      icon: CreditCard,
      href: "/dashboard/user/subscription",
    },
    { name: "My Profile", icon: User, href: "/dashboard/user/profile" },
  ];

  const settingsItems = [
    { name: "Settings", icon: Settings, href: "/dashboard/user/settings" },
    { name: "Help Center", icon: HelpCircle, href: "/dashboard/user/help" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 w-72 bg-[#F8F9FF] border-r border-gray-100 flex flex-col h-screen transition-transform duration-300 md:translate-x-0 font-epilogue",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Logo />
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 no-underline",
                  isActive
                    ? "bg-white text-primary shadow-sm ring-1 ring-gray-100"
                    : "text-gray-500 hover:text-primary hover:bg-white/50",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-primary" : "text-gray-400",
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* My Files Section */}
          <div className="pt-4">
            <button
              onClick={() => setIsMyFilesOpen(!isMyFilesOpen)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-[#25324B] rounded-xl bg-[#E8EBFD]/50 transition-all",
                !isMyFilesOpen && "bg-transparent",
              )}
            >
              <div className="flex items-center gap-3">
                <FolderIcon className="w-5 h-5 text-[#25324B]" />
                <span>My Files</span>
              </div>
              {isMyFilesOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {isMyFilesOpen && (
              <div className="mt-2 ml-4 pl-4 border-l border-gray-200 space-y-1">
                {rootFolders.length > 0 ? (
                  rootFolders.map((folder) => (
                    <Link
                      key={folder.id}
                      href={`/dashboard/user/my-folders?folderId=${folder.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-primary hover:bg-white/50 rounded-lg transition-all no-underline"
                    >
                      <FolderIcon className="w-4 h-4 fill-gray-400 stroke-gray-400 group-hover:fill-primary group-hover:stroke-primary" />
                      <span className="truncate">{folder.name}</span>
                    </Link>
                  ))
                ) : (
                  <p className="text-[10px] text-gray-400 px-4 py-2 font-medium">
                    No folders found
                  </p>
                )}
              </div>
            )}
          </div>
        </nav>

        <div className="px-6 pb-10 space-y-2">
          {settingsItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 no-underline",
                  isActive
                    ? "bg-white text-primary shadow-sm ring-1 ring-gray-100"
                    : "text-gray-500 hover:text-primary",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-primary" : "text-gray-400",
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
