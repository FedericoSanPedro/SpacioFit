"use client";

import { useEffect, useState } from "react";

export default function TurnosPage() {
  const [turnos, setTurnos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/turnos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTurnos(data);
        setLoading(false);
      });
  }, []);

  const inscribirme = async (turnoId: number) => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3001/alumnos/me/turno", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ turnoId }),
    });

    if (!res.ok) {
      alert("Error al inscribirse");
      return;
    }

    alert("Inscripción exitosa ✅");
  };

  if (loading) return <p className="p-4">Cargando turnos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Turnos disponibles</h1>

      <div className="grid gap-4">
        {turnos.map((turno) => (
          <div
            key={turno.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">🕒 {turno.hora}</p>
              <p className="text-sm text-gray-500">
                Alumnos inscriptos: {turno.alumnos.length}
              </p>
            </div>

            <button
              onClick={() => inscribirme(turno.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Inscribirme
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}