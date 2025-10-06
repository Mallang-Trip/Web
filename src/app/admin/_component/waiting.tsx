interface WaitingProps {
  hasHydrated: boolean;
}

export default function Waiting({ hasHydrated }: WaitingProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-gray-600">
            {!hasHydrated ? "데이터 로딩 중..." : "인증 확인 중..."}
          </p>
        </div>
      </div>
    </div>
  );
}
