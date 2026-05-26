"use server";

import { dbConnect } from "@/lib/db";
import Contact from "@/models/Contact";

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

  console.log("Data saved successfully")
}

