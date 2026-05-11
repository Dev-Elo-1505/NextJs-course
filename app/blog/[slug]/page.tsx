"use client";
import { useParams } from "next/navigation";

const posts = [
  {
    id: 0,
    title: "Yellow Fever",
    body: "Yellow fever is a chronic disease",
  },
  {
    id: 1,
    title: "Lassa Fever",
    body: "Lassa fever is a rat disease",
  },
  {
    id: 2,
    title: "Henta Fever",
    body: "Henta fever is a new disease",
  },
];

const BlogSlug = () => {
  const { slug } = useParams();
  const blog = posts.find((item) => item.id === Number(slug));
  console.log(blog)

  if (blog === undefined) return <h1>No Posts Found</h1>;


  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
    </div>
  );
};

export default BlogSlug;
