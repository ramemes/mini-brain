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

import { CreateNoteForm } from "./create-note-form";
import { useState } from "react";
import { Plus, Upload } from "lucide-react";
import { btnStyles, iconStyles } from "@/styles/styles";

export const CreateNoteButton = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className={btnStyles}>
          <Plus className={iconStyles}/>
          Create Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
          <DialogDescription>
            Record a searchable note for future reference
          </DialogDescription>
          <CreateNoteForm
            onUpload={() => setIsOpen(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
