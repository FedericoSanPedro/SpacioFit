import Link from 'next/link';
import { getAlumnos, Alumno, AlumnoListItem } from '@/lib/api';

export default async function Home() {
  const alumnos: AlumnoListItem[] = await getAlumnos();

  return  (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Alumnos</h1>
      <ul>
        {alumnos.map((a) => (
          <li key={a.id}>{a.nombre}</li>
        ))}
      </ul>
    </main>
  );
}
