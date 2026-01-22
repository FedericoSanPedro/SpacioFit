import Link from 'next/link';
import { getAlumnos, AlumnoListItem } from '@/lib/api';

export default async function AlumnosPage() {
  const alumnos: AlumnoListItem[] = await getAlumnos();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Alumnos</h1>

      <table className="w-full text-sm">
        <thead className="bg-zinc-900 text-zinc-400">
          <tr>
            <th className="text-left p-4">Nombre</th>
            <th className="text-left p-4">Estado</th>
            <th className="text-left p-4">Horas</th>
            <th className="text-left p-4">Antigüedad (días)</th>
            <th className="p-4"></th>
          </tr>
        </thead>

        <tbody>
          {alumnos.map(a => (
            <tr key={a.id} className="border-b border-zinc-800 hover:bg-zinc-900 transition">
              <td className="py-3 px-4">{a.nombre}</td>
              <td className="py-3 px-4 capitalize">{a.estado}</td>
              <td className="py-3 px-4">{a.horasTotales}</td>
              <td className="py-3 px-4">{a.antiguedadDias}</td>
              <td className="py-3 px-4 text-blue-400 hover:underline">
                <Link
                  href={`/alumnos/${a.id}`}
                  className="text-blue-600 underline"
                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
