'use client';

import { useEffect, useState } from 'react';
import { authFetch } from '@/lib/authFetch';
import { getTurnos } from '@/lib/api';

type Turno = {
  id: number;
  hora: string;
  alumnos: {
    id: number;
    user: { name: string };
  }[];
};

export default function AlumnosPage() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTurnos();
        setTurnos(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <p className="p-6 text-white">Loading...</p>;
  }

  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-2xl font-bold">Available shifts</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {turnos.map((t) => (
          <div
            key={t.id}
            className="bg-gray-950 border border-gray-800 rounded p-4"
          >
            <h2 className="text-lg font-semibold">Shift {t.hora}</h2>

            <p className="text-sm text-gray-400">
              Students registered: {t.alumnos.length}
            </p>

            <ul className="mt-2 text-sm text-gray-300 space-y-1">
              {t.alumnos.map((a) => (
                <li key={a.id}>• {a.user.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}