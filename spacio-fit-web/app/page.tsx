'use client';

import Link from 'next/link';
import { getAlumnos, Alumno } from '@/lib/api';

export default async function Home() {
  const alumnos: Alumno[] = await getAlumnos();

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Alumnos</h1>

      <ul className="space-y-2">
        {alumnos.map((alumno) => (
          <Link key={alumno.id} href={`/alumnos/${alumno.id}`}>
            <li className="p-4 bg-neutral-800 rounded hover:bg-neutral-700">
              {alumno.nombre}
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
