import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex items-center flex-col gap-8 justify-center mt-16 min-h-screen">
      <h1 className="text-3xl text-white">Not found</h1>
      <Button as={Link} href={'/'} color="primary" radius="sm">
        Go to Home
      </Button>
    </main>
  );
}
