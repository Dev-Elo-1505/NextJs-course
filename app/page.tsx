import { dbConnect } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  async function createTodo(formData: FormData) {
    'use server'
    const title = formData.get('title')
    console.log('Creating habit... ', title)
  }
  await dbConnect()
  return (
    <div className="flex text-4xl text-green-500 justify-center h-screen items-center bg-black font-semibold">
      <Link href="/note">Go to notes app</Link>
      <form action={createTodo}>
        <input name='title' />
        <button type='submit'>Add habit</button>
      </form>
    </div>
  );
}
