import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <Link href="/users">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded-md m-5">
          Go to /users
        </button>
      </Link>
    </main>
  );
}
