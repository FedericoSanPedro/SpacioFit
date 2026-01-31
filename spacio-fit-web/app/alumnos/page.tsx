'use client';

import { useEffect, useState } from 'react';
import { authFetch } from '@/lib/authFetch';

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await authFetch('http://localhost:3001/alumnos');
      const data = await res.json();
      setAlumnos(data);
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
