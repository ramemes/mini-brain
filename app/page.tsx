"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import Image from "next/image";

export default function Home() {

  const documents = useQuery(api.documents.getDocuments)
  const createDocument = useMutation(api.documents.createDocument)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <ModeToggle/>
        <Button
          onClick={() => createDocument({title: "Hello world"})}
        >Click Me</Button>

        {documents?.map((document) => (
          <div key={document._id} className="flex items-center justify-center">
            <h1>{document.title}</h1>
          </div>
        
        ))}
      </Authenticated>
    </main>
  );
}
