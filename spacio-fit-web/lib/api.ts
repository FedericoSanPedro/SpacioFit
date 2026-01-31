export type Alumno = {
  id: number;
  nombre: string;
  email: string;
};

export type AlumnoListItem = {
  id: number;
  nombre: string;
  estado: string;
  horasTotales: number;
  antiguedadDias: number;
};

export type ProgresoAlumno = {
  alumnoId: number;
  nombre: string;
  horasTotales: number;
  asistenciasTotales: number;
  faltas: number;
  antiguedadDias: number;
  frecuenciaSemanal: number;
  nivelActual: string;
  porcentajeProgreso: number;
  horasParaProximoNivel: number;
  estado: string;
};

export type AsistenciaChartItem = {
  fecha: string;
  asistencias: number;
  faltas: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAlumnos() {
  const res = await fetch(`${API_URL}/alumnos`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al obtener alumnos');
  }

  return res.json() as Promise<AlumnoListItem[]>;
}

export async function getProgresoAlumno(
  alumnoId: number
): Promise<ProgresoAlumno> {
  const res = await fetch(
    `${API_URL}/alumnos/${alumnoId}/progreso`,
    {
      next: {
        revalidate: 60, // segundos
      },
    }
  );

  if (!res.ok) {
    throw new Error('Error al obtener progreso');
  }

  return res.json();
}

export async function getAsistenciasChart(alumnoId: number) {
  const token = localStorage.getItem('token');

  const res = await fetch(
    `${API_URL}/alumnos/${alumnoId}/asistencias-chart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Error al obtener asistencias');
  }

  return res.json();
}
