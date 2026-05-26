import ContactForm from "@/components/ContactForm";
import { createContact } from "./actions/action";


export default async function Home() {
 
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-2xl font-bold mb-6">Contact Us🖤</h1>
      <ContactForm action={createContact} />
    </div>
  );
}
