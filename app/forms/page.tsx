import Form from "next/form";
import { createUser } from "../actions/action";
export default function FormsPage() {
  return (
    <>
      <Form action={createUser}>
        <h2>Create User</h2>
        <input name="name" />
        <input name="email" />
        <button type="submit">Create</button>
      </Form>
      <Form action={"/search"}>
      <h2>Search Post Form</h2>
        <input name="query" placeholder="Search..." />
        <button>Search post</button>
      </Form>
    </>
  );
}
