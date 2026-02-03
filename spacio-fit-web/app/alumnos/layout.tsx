import RequireAuth from '@/components/RequireAuth';

export default function AlumnosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
