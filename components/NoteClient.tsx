"use client";

import { INote } from "@/models/Note";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type NoteClientProps = {
  initialNotes: INote[];
};

const NoteClient = ({ initialNotes }: NoteClientProps) => {
  const [notes, setNotes] = useState<INote[]>(initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json()
      if (result.success) {
        setNotes([result.data, ...notes]);
        toast.success("Notes created successfully");
        setTitle("");
        setContent("");
      } else {
        toast.error(result.error || "Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:",error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-4 border">
      <h2 className="font-semibold text-xl mb-3">Create New Note</h2>
      <form className="space-y-6" onSubmit={createNote}>
        <input
          type="text"
          className="w-full border  border-gray-200 p-3 outline-0 focus:border-0 focus:ring-2 focus:ring-green-400"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border  border-gray-200 p-3 outline-0 focus:border-0 focus:ring-2 focus:ring-green-400"
          rows={5}
          placeholder="Content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          disabled={loading}
          type="submit"
          className="bg-green-500  px-6 py-2 cursor-pointer rounded-md hover:bg-green-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
      <div className="mt-8 space-y-4">
        {notes.length === 0 ? (
          <p className="text-gray-400 text-center">No notes found. Create your first note!</p>
        ) : (
          notes.map((note: any, index: number) => (
            <div key={note._id || index} className="p-4 border border-gray-600 rounded-md bg-gray-900 text-white">
              <h3 className="font-bold text-lg mb-2">{note.title}</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteClient;
