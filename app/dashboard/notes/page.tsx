import { CreateDocumentButton } from "../documents/create-document-button";
import { CreateNoteButton } from "./create-note-button";

const NotesPage = () => {
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>
    </main>
  )
};

export default NotesPage;
