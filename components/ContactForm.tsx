import Form from "next/form";

interface ContactFormProps {
    action: (formData: FormData) => void
}

const ContactForm = ({ action }: ContactFormProps) => {
  return (
    <Form action={action} className="flex flex-col space-y-4">
      <input name="name" placeholder="Name" className="border px-2" />
      <input name="email" placeholder="Email" className="border px-2" />
      <textarea name="message" placeholder="Message" className="border px-2" />
      <button className="bg-black text-white px-4 py-12">Submit</button>
    </Form>
  );
};

export default ContactForm;
