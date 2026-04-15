

async function getData() {
  const res = await fetch("https://dummyjson.com/quotes/random");
  if (!res.ok) throw new Error("failed to fetch data");
  return res.json();
}

const Courses = async () => {
  const data = await getData();
  console.log(data)
  return (
    <div>
      
      <h1>Courses</h1>
      <p className="text-center text-gray-800 italic text-2xl">{data.quote}</p>
      <div className="bg-gray-400 h-0.5 w-96 m-auto mt-2 mb-2"></div>
      <p className="text-center text-sm">{data.author}</p>
    </div>
  );
};

export default Courses;
