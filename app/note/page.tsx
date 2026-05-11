import NoteClient from "@/components/NoteClient";
import dbConnect from "@/lib/db";
import Note from "@/models/Note";

// Revalidate occasionally, or make it dynamic if notes change often.
// For a notes app, we typically want dynamic rendering so the latest are always shown.
export const dynamic = 'force-dynamic';

const NotesPage = async () => {
  await dbConnect();
  
  // Fetch existing notes from MongoDB
  const notesData = await Note.find({}).sort({ createdAt: -1 }).lean();
  
  // Serialize the data correctly since Mongoose returns ObjectId and Date objects 
  // that cannot be passed directly to Client Components via props in Next.js.
  const initialNotes = JSON.parse(JSON.stringify(notesData));

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="font-bold text-center text-3xl mb-4">Notes App</h1>
      <NoteClient initialNotes={initialNotes} />
    </div>
  );
};

export default NotesPage;
