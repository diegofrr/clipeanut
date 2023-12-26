'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="mt-16 bg-zinc-950 h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-bold underline">Hello World!</h1>
        <Link href="/trendings">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded-md m-5">
            Go to Trending Videos
          </button>
        </Link>
      </main>
    </>
  );
}
