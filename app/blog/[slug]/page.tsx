import { Metadata } from "next";

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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = posts.find((item) => item.id === Number(slug));
  
  return {
    title: blog ? blog.title : `This is ${slug}`,
    description: blog ? blog.body : `This description is for ${slug}`,
  };
}

const BlogSlug = async ({ params }: Props) => {
  const { slug } = await params;
  const blog = posts.find((item) => item.id === Number(slug));
  console.log(blog);

  if (blog === undefined) return <h1>No Posts Found</h1>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
    </div>
  );
};

export default BlogSlug;
