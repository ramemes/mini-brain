"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";


export default function DocumentPage({
  params
}: {
  params: {
    documentId: Id<"documents">
  }
}) {

  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId
  })

  if (!document) {
    return <div>Loading document</div>
  }

  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{document.title}</h1>
      </div> 

      <div className="flex gap-12">
        <div className="bg-gray-900 p-4 rounded flex-1 h-[600px]">
          {document.documentUrl && 
          <iframe 
            src={document.documentUrl}
            className="w-full h-full"
          />
          }
        </div>

        <div className="w-80 bg-gray-900">

        </div>
        
      </div>

      
    </main>
  );
}
