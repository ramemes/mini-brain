"use client"

import { ModeToggle } from "@/components/ui/mode-toggle";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="bg-slate-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl text-semibold">
          <Image src="/logo.png" width={50} height={50} alt="Mini Brain" />
          MINIBRAIN
        </div>
        <div>
          <Unauthenticated>
            <SignInButton />
          </Unauthenticated>
          <Authenticated>
            <div className="flex gap-4">
              <ModeToggle/>
              <UserButton />
            </div>

          </Authenticated>
        </div>

      </div>
    </div>
  )
};

