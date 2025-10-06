import Loading from "@/components/loading";

interface WaitingProps {
  hasHydrated: boolean;
}

export default function Waiting({ hasHydrated }: WaitingProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Loading text={!hasHydrated ? "데이터 로딩 중..." : "인증 확인 중..."} />
    </div>
  );
}
