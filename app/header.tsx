import { ModeToggle } from "@/components/ui/mode-toggle";

import Image from "next/image";
import { HeaderActions } from "./header-actions";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="bg-slate-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 text-2xl text-semibold">
              <Image src="/logo.png" width={50} height={50} alt="Mini Brain" />
              MINIBRAIN
            </Link>
          <nav>
            <Link 
              href="/dashboard"
              className="hover:text-slate-300"
            >
              Documents
            </Link>
          </nav>
        </div>
        <div className="flex gap-4 items-center">
          <ModeToggle/>
          <HeaderActions/>
        </div>
      </div>
    </div>
  )
};

