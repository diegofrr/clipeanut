'use client';

import { useState } from 'react';

export default function TrendingPage() {
  const [bool, setBool] = useState(false);

  function handleSetBool() {
    setBool(!bool);
  }

  return (
    <div className="flex gap-5 flex-col justify-center items-center mt-16">
      <h1
        className={`text-4xl font-bold ${
          bool ? 'text-red-500' : 'text-blue-500'
        }`}
      >
        Trending Videos
      </h1>

      <button
        onClick={handleSetBool}
        className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded-md m-5"
      >
        Alterar cor do título
      </button>
    </div>
  );
}
