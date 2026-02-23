'use client';

import { useState } from 'react';
import AuthInput from '@/components/AuthInput';
import AuthButton from '@/components/AuthButton';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Invalid credentials');

      const data = await res.json();
      console.log('LOGIN RESPONSE', data);
      const token = data.access_token ?? data.accessToken;
      localStorage.setItem('token', token);

      router.push('/turnos');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-gray-950 border border-gray-800 p-6 rounded w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-bold text-white">Login</h1>

        <AuthInput label="Email" value={email} onChange={setEmail} />
        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <AuthButton text="Login" loading={loading} />
      </form>
    </div>
  );
}
