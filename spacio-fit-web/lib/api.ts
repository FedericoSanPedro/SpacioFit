export type Alumno = {
  id: number;
  nombre: string;
  email: string;
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

const API_URL = 'http://localhost:3001';

export async function getAlumnos(): Promise<Alumno[]> {
  const res = await fetch(`${API_URL}/alumnos`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al obtener alumnos');
  }

  return res.json();
}

export async function getProgresoAlumno(
  alumnoId: number
): Promise<ProgresoAlumno> {
  const res = await fetch(
    `${API_URL}/alumnos/${alumnoId}/progreso`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Error al obtener progreso');
  }

  return res.json();
}
