'use client';

import { useEffect, useState } from 'react';
import { getAsistenciasChart } from '@/lib/api';

export default function ProgresoClient({ alumnoId }: { alumnoId: number }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await getAsistenciasChart(alumnoId);
        setData(res);
      } catch (err) {
        setError('Error al obtener progreso');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [alumnoId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Asistencias</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
