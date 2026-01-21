type Props = {
  nombre: string;
  nivel: string;
  horasTotales: number;
  progreso: number;
};

export function ProgressCard({
  nombre,
  nivel,
  horasTotales,
  progreso,
}: Props) {
  return (
    <div style={{ padding: '1.5rem', background: '#111', borderRadius: 8 }}>
      <h2>{nombre}</h2>

      <p>
        <strong>Nivel:</strong> {nivel}
      </p>

      <p>
        <strong>Horas:</strong> {horasTotales}
      </p>

      <div style={{ marginTop: '1rem' }}>
        <div
          style={{
            width: '100%',
            height: 14,
            background: '#333',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progreso}%`,
              height: '100%',
              background: '#6366f1',
            }}
          />
        </div>
        <small>{progreso}%</small>
      </div>
    </div>
  );
}
