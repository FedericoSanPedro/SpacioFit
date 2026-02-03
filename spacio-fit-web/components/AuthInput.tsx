'use client';

type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
};

export default function AuthInput({
  label,
  type = 'text',
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}
