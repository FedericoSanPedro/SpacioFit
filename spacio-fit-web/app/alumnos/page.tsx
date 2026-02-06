'use client';

import { useEffect, useState } from 'react';
import { authFetch } from '@/lib/authFetch';

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
      const res = await authFetch(`/alumnos`);
      const data = await res.json();
      setAlumnos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Alumnos</h1>

      <ul>
        {alumnos.map((a: any) => (
          <li key={a.id}>{a.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
