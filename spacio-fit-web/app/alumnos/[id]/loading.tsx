export default function Loading() {
  return (
    <div className="p-6 animate-pulse text-white">
      <div className="h-6 w-48 bg-zinc-800 rounded mb-4" />

      <div className="space-y-2">
        <div className="h-4 w-32 bg-zinc-800 rounded" />
        <div className="h-4 w-40 bg-zinc-800 rounded" />
        <div className="h-4 w-28 bg-zinc-800 rounded" />
      </div>

      <div className="mt-6">
        <div className="h-3 w-full bg-zinc-800 rounded" />
      </div>
    </div>
  );
}
