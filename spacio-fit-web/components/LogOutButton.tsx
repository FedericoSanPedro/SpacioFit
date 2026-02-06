'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}