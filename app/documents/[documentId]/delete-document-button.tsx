"use client";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { btnStyles, iconStyles } from "@/styles/styles";
import { useMutation } from "convex/react";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteDocumentButtonProps {
  documentId: Id<"documents">
}

export const DeleteDocumentButton = ({
  documentId
}: DeleteDocumentButtonProps) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const deleteDocument = useMutation(api.documents.deleteDocument)
  const router = useRouter()

  const onDeleteDocument = () => {
    setIsLoading(true)
    deleteDocument({
      documentId
    })
    .then(() => {
      router.push('/')
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}> 
      <DialogTrigger>
        <Button variant="destructive" className={btnStyles}>
          <TrashIcon className={iconStyles}/> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this document?</DialogTitle>
          <DialogDescription>
            Your document can not be recovered after it's been deleted
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <LoadingButton 
            onClick={onDeleteDocument}
            isLoading={isLoading}
            loadingText="Deleting..."
          >
            Delete
          </LoadingButton>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

