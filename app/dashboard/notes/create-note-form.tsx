"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { LoadingButton } from "@/components/loading-button";
import { Id } from "@/convex/_generated/dataModel";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  text: z.string().min(1).max(2500),
});

interface UploadDocumentFormProps {
  onUpload: () => void;
}

export const CreateNoteForm = ({ 
  onUpload
}: UploadDocumentFormProps) => {
  const createNote = useMutation(api.notes.createNote)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    await createNote({
      text: values.text,
    });
    onUpload();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea 
                  rows={8}
                  placeholder="Your note" {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <LoadingButton
          isLoading={form.formState.isSubmitting}
          loadingText="Creating..."
        >
          Create
        </LoadingButton>
      </form>
    </Form>
  );
};
