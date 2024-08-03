"use client";

import { cn } from "@/lib/utils";
import { ClipboardPen, Cog, FilesIcon, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const SideNav = () => {

  const pathname = usePathname();


  return (
      <nav>
        <ul className="space-y-6">
          <li>
            <Link
              className={cn(
                "font-light flex gap-2 items-center text-xl hover:text-blue-500",
                pathname.endsWith("/dashboard/documents") && "text-blue-400" 
              )}
              href="/dashboard/documents"
            >
              <FilesIcon/>
              Documents
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                "font-light flex gap-2 items-center text-xl hover:text-blue-500",
                pathname.endsWith("/dashboard/notes") && "text-blue-400" 
              )}
              href="/dashboard/notes"
            >
              <ClipboardPen/>
              Notes
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                "font-light flex gap-2 items-center text-xl hover:text-blue-500",
                pathname.endsWith("/dashboard/settings") && "text-blue-400" 
              )}              
              href="/dashboard/settings"
            >
              <Settings/>
              Settings
            </Link>
          </li>
        </ul>
      </nav>


  );
};

