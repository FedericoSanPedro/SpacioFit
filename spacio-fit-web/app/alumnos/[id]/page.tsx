import ProgresoClient from './ProgresoClient';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProgresoClient alumnoId={Number(id)} />;
}