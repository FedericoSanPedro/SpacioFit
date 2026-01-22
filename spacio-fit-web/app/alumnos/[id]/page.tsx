import { getProgresoAlumno, getAsistenciasChart } from '@/lib/api';
import StatCard from './components/StatCard';
import ProgressBar from './components/ProgressBar';
import AsistenciaChart from './components/AsistenciaChart';

export default async function ProgresoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 👈 CLAVE

  const progreso = await getProgresoAlumno(Number(id));

  const chartData = await getAsistenciasChart(Number(id));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {progreso.nombre}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Horas totales" value={progreso.horasTotales} />
        <StatCard title="Asistencias" value={progreso.asistenciasTotales} />
        <StatCard title="Faltas" value={progreso.faltas} />
        <StatCard
          title="Antigüedad"
          value={`${progreso.antiguedadDias} días`}
        />
      </div>

      <ProgressBar
        percentage={progreso.porcentajeProgreso}
        label={`Nivel: ${progreso.nivelActual}`}
      />

      <AsistenciaChart data={chartData} />
      
    </div>
  );
}
