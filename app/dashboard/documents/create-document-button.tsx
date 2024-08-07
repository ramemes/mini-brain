"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { UploadDocumentForm } from "./upload-document-form";
import { useState } from "react";
import { Upload } from "lucide-react";
import { btnStyles, iconStyles } from "@/styles/styles";

export const CreateDocumentButton = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className={btnStyles}>
          <Upload className={iconStyles}/>
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a Document</DialogTitle>
          <DialogDescription>
            Upload a team document for you to search over in the future.
          </DialogDescription>
          <UploadDocumentForm
            onUpload={() => setIsOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
