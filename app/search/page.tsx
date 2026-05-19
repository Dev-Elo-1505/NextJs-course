export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { query } = await searchParams;
  const results = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${query}`,
  );
  const data = await results.json();
  return (
    <div>
      <h1 className='font-bold'>{data.title}</h1>
      <p className='text-gray-900'>{data.body}</p>
    </div>
  );
}
