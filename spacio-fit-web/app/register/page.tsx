'use client';

import { useState } from 'react';
import AuthInput from '@/components/AuthInput';
import AuthButton from '@/components/AuthButton';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error();

      router.push('/login');
    } catch {
      setError('Error creating user');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleRegister}
        className="bg-gray-950 border border-gray-800 p-6 rounded w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-bold text-white">Register</h1>

        <AuthInput label="Name" value={name} onChange={setName} />
        <AuthInput label="Email" value={email} onChange={setEmail} />
        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <AuthButton text="Create account" loading={loading} />
      </form>
    </div>
  );
}
