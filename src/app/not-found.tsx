import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="m-auto flex max-w-9xl items-center flex-col gap-8 justify-center min-h-screen-minus-navbar">
      <h1 className="text-3xl text-white">Not found</h1>
      <Button as={Link} href={'/'} color="primary" radius="sm">
        Go to Home
      </Button>
    </main>
  );
}
