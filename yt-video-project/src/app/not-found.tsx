import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex items-center flex-col gap-8 justify-center mt-16 min-h-screen-minus-navbar">
      <h1 className="text-3xl text-white">Not found</h1>
      <Link href="/">
        <Button color="primary" radius="sm">
          Go to Home
        </Button>
      </Link>
    </main>
  );
}
