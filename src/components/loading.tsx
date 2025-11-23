interface LoadingProps {
  text?: string;
}

export default function Loading({ text = "" }: LoadingProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* 스피너 */}
      <div className="relative h-16 w-16">
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-gray-200"></div>
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
      {/* 로딩 텍스트 (선택) */}
      <p className="text-sm font-medium text-gray-600">{text}</p>
    </div>
  );
}
