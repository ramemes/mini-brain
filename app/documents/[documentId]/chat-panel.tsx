import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useAction } from "convex/react";

export const ChatPanel = ({
  documentId
} : { documentId: Id<"documents">}) => {

  const askQuestion = useAction(api.documents.askQuestion)

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const text = formData.get("text") as string

    const chatCompletion = await askQuestion({
      question: text,
      documentId
    })

    console.log(chatCompletion)
  }

  return (
    <div className="bg-gray-900 flex flex-col justify-between h-[600px] w-full p-2">
      <div className="overflow-y-auto h-full space-y-2">
        <div className="bg-slate-950 p-2 rounded">
          Ask any question about this document below:
        </div>
        <div
          className={cn("bg-slate-800 p-2 rounded", 
            true && "text-right"
          )}
        >
          Ask any question about this document below:
        </div>

      </div>
      <div className="flex gap-2 p-1">
        <form onSubmit={onSubmitForm} className="flex w-full gap-2 p-2">
          <Input required name="text"/>
          <Button>Submit</Button>
        </form>
      </div>

    </div>
  )
};

