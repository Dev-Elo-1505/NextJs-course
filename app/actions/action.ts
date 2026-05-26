"use server";

import { dbConnect } from "@/lib/db";
import Contact from "@/models/Contact";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  console.log(`Creating user...Name: ${name}, Email: ${email}`);
}

export async function createContact(formData: FormData) {
  await dbConnect()

  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')

  await Contact.create({
    name,
    email,
    message
  })

  redirect('/dashboard')
}

export async function updateStatus(id: string) {
  await dbConnect()

  await Contact.findByIdAndUpdate(id, {
    status: "resolved"
  })
  revalidatePath('/dashboard')
}

