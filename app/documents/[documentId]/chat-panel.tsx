import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
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
    <div className="w-80 bg-gray-900 flex flex-col justify-between h-[600px]">
      <div className="overflow-y-auto">
        <div className="p-4 bg-gray-800">Hello</div>

      </div>
      <div>
        <form 
          className="flex gap-2 p-1"
          onSubmit={onSubmitForm}
        >
          <Input required name="text"/>
          <Button>Submit</Button>
        </form>
      </div>

    </div>
  )
};

