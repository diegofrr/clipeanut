import Link from 'next/link';

export default function UsersPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Users</h1>
      <Link href="/">Go to Home</Link>
    </main>
  );
}
