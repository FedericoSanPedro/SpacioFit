'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogged(!!token);
  }, [pathname]); // 👈 se actualiza cuando cambia la ruta

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLogged(false);
    router.push('/login');
  }

  return (
    <nav className="w-full bg-gray-950 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-white font-bold text-lg">
        SpacioFit
      </Link>

      <div className="flex gap-4 items-center">
        {isLogged ? (
          <>
            <Link
              href="/turnos"
              className="text-gray-300 hover:text-white transition"
            >
              Turnos
            </Link>

            <Link
              href="/alumnos"
              className="text-gray-300 hover:text-white transition"
            >
              Alumnos
            </Link>

            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
