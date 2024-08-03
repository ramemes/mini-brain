import { ClipboardPen, Cog, FilesIcon, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { SideNav } from "./side-nav";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex gap-24 container mx-auto pt-12">
      <SideNav/>

      {children}
    </div>
  );
};

export default DashboardLayout;
