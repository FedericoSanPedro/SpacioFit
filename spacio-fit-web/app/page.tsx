'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/alumnos');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-950 border border-gray-800 rounded-lg p-8 w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-bold text-white">SpacioFit</h1>
        <p className="text-gray-400 text-sm">
          Gestión de alumnos, asistencias y progreso.
        </p>

        <div className="space-y-3">
          <Link
            href="/login"
            className="block w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/register"
            className="block w-full border border-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-900 transition"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
