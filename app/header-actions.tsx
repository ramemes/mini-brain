"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";

export const HeaderActions = () => {
  return (
    <>
      <Unauthenticated>
        <Button asChild>
          <SignInButton />
        </Button>
        
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
      <AuthLoading>
        Loading...
      </AuthLoading>
    </>
  )
};

