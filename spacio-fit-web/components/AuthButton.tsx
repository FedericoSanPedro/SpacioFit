'use client';

type Props = {
  text: string;
  loading?: boolean;
};

export default function AuthButton({ text, loading }: Props) {
  return (
    <button
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded mt-4 disabled:opacity-50"
    >
      {loading ? 'Loading...' : text}
    </button>
  );
}
