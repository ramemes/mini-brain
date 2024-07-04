import { ModeToggle } from "@/components/ui/mode-toggle";

import Image from "next/image";
import { HeaderActions } from "./header-actions";

export const Header = () => {
  return (
    <div className="bg-slate-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl text-semibold">
          <Image src="/logo.png" width={50} height={50} alt="Mini Brain" />
          MINIBRAIN
        </div>
        <div className="flex gap-4 items-center">
          <ModeToggle/>
          <HeaderActions/>
        </div>

      </div>
    </div>
  )
};

