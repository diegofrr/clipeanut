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
        className="
        py-2 px-4 rounded-md m-5 font-normal
        bg-blue-500 text-white
        hover:bg-blue-700 hover:scale-105 active:transform-none 
        active:bg-blue-500 transition-all duration-[.3s] ease-[ease]"
      >
        Alterar cor do título
      </button>
    </div>
  );
}
