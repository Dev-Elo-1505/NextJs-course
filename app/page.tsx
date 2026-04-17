import Link from "next/link";

export default function Home() {
  return (
    <div className="flex text-4xl text-green-500 justify-center h-screen items-center bg-black font-semibold">
      <Link href="/note">Go to notes app</Link>
    </div>
  );
}
