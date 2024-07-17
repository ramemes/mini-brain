"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import { CreateDocumentButton } from "./create-document-button";
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {

  const documents = useQuery(api.documents.getDocuments)

  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {!documents && 
          new Array(8).fill('').map((_, i) => (
            <Card className="p-6 h-[230px] flex flex-col justify-between">
              <Skeleton className="h-[20px] rounded"/>
              <Skeleton className="h-[20px] rounded"/>
              <Skeleton className="h-[20px] rounded"/>
              <Skeleton className="w-[80px] h-[40px] rounded"/>
            </Card>
          ))
        }
        {documents && documents.length > 0 &&
          documents?.map((document) => (
            <DocumentCard
              key={document._id} 
              document={document}
            />
          ))
        }
      </div>
      {
        documents && documents.length === 0 &&
        <div className="py-64 flex flex-col justify-center items-center gap-8 ">
          <Image
            src="/documents.svg"
            width="200"
            height="200"
            alt="picture of a girl holding documents"
          />
          <h2 className="text-2xl">You have no documents</h2>
          <CreateDocumentButton />
        </div>
      }
    </main>
  );
}
