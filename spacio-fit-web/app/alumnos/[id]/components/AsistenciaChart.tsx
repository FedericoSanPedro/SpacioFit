'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type Props = {
  data: {
    fecha: string;
    asistencias: number;
    faltas: number;
  }[];
};

export default function AsistenciaChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-4">Evolución de asistencias</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis allowDecimals={false} />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="asistencias"
            stroke="#22c55e"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="faltas"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
