"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import { CreateDocumentButton } from "./create-document-button";

export default function Home() {

  const documents = useQuery(api.documents.getDocuments)

  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>
      <div className="grid  xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {documents?.map((document) => (
          <DocumentCard
            key={document._id} 
            document={document}
          />
        ))}
      </div>
      
    </main>
  );
}
