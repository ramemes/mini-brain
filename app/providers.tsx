"use client";

import { Loading } from "@/components/loading";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);


export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {/* <Authenticated> */}
            {children}
          {/* </Authenticated>    */}
          {/* <AuthLoading>
            <Loading/>
          </AuthLoading>        */}
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </ThemeProvider>
  )
};

