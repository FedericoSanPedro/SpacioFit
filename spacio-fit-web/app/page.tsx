export default async function Dashboard() {

  const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/alumnos/1/progreso`
);

if (!res.ok) {
  throw new Error("Error al cargar progreso");
}

const data = await res.json();
/* 

  const res = await fetch('http://localhost:3000/alumnos/1/progreso', {
    cache: 'no-store',
  });

  const alumno = await res.json();

  return (
    <main className="min-h-screen bg-secondary p-10">
      <h1 className="text-3xl font-bold text-dark mb-6">
        Dashboard Alumno
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Horas Totales" value={alumno.horasTotales} />
        <Card title="Frecuencia Semanal" value={alumno.frecuenciaSemanal} />
        <Card title="Nivel" value={alumno.nivelActual} />
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-primary mt-2">{value}</p>
    </div>
  ); 
  */
}
