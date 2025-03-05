'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton({ deleteSession }: { deleteSession: () => Promise<void> }) {
  const router = useRouter();

  const logOut = async () => {
    await deleteSession(); // Ensure session is deleted first
    router.push('/login'); // Then navigate to login
  };

  return <button onClick={logOut}>Log Out</button>;
}
