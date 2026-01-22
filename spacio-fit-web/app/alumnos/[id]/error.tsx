'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold text-red-400">
        Error al cargar el alumno
      </h2>

      <p className="mt-2 text-gray-300">
        {error.message}
      </p>

      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-indigo-600 rounded"
      >
        Reintentar
      </button>
    </div>
  );
}
