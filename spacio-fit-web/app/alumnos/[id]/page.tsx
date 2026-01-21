import { getProgresoAlumno, ProgresoAlumno } from '@/lib/api';

export default async function ProgresoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 🔥 CLAVE

  const progreso: ProgresoAlumno = await getProgresoAlumno(Number(id));

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold">{progreso.nombre}</h1>

      <p>Nivel: {progreso.nivelActual}</p>
      <p>Horas totales: {progreso.horasTotales}</p>

      <div className="mt-4">
        <div className="h-4 bg-gray-700 rounded">
          <div
            className="h-4 bg-indigo-500 rounded"
            style={{ width: `${progreso.porcentajeProgreso}%` }}
          />
        </div>
        <p className="mt-2">{progreso.porcentajeProgreso}%</p>
      </div>
    </div>
  );
}
