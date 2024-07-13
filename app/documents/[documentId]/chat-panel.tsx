
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { QuestionForm } from "./question-form";

export const ChatPanel = ({
  documentId
} : { documentId: Id<"documents">}) => {

  const chats = useQuery(api.chats.getChatsForDocument, {
    documentId
  })



  return (
    <div className="bg-gray-900 flex flex-col justify-between h-[600px] w-full p-2 rounded-xl">
      <div className="overflow-y-auto h-full space-y-2">
        <div className="bg-slate-950 p-2 rounded">
          Ask any question about this document below:
        </div>
        {chats?.map((chat) => (
          <div
            key={chat._id}
            className={cn(
              {
                "bg-slate-800": chat.isHuman,
                "bg-slate-950": !chat.isHuman,
                'text-right': chat.isHuman
              },
              "rounded p-4 whitespace-pre-line"
            )}
          >
            {chat.isHuman ? "You: " : "AI: "}
            {chat.text}
          </div>
        ))}


      </div>
      <div className="flex gap-2 p-1">
        <QuestionForm documentId={documentId}/>
      </div>

    </div>
  )
};

