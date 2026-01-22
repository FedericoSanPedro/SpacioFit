type ProgressBarProps = {
  percentage: number;
  label: string;
};

export default function ProgressBar({
  percentage,
  label,
}: ProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>

      <div className="h-3 w-full bg-gray-200 rounded-full">
        <div
          className="h-3 bg-blue-500 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
