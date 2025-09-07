import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface DriverInfoCardProps {
  handleCopyPhone: () => void;
  status: string; // 예약 상태
}

export default function DriverInfoCard({
  handleCopyPhone,
  status,
}: DriverInfoCardProps) {
  const isApproved = (status || "").toUpperCase() === "APPROVED";

  const driver = {
    name: "박민수 기사님",
    license: "34오 5678",
    phone: "+82-10-1234-5678",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          담당 드라이버
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isApproved ? (
          <div className="flex items-center gap-4">
            <Image
              src={driver.avatar}
              alt="드라이버 프로필"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{driver.name}</h3>
              <p className="flex items-center gap-1 text-sm text-gray-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 6h3l2 7H9l-1-4H5"
                  />
                </svg>
                {driver.license}
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {driver.phone}
                <button
                  onClick={handleCopyPhone}
                  className="ml-1 rounded p-1 hover:bg-gray-100"
                  title="전화번호 복사"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <svg
              className="mt-0.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
            <div>
              <p className="font-medium text-gray-900">담당 드라이버 미배정</p>
              <p className="mt-1 leading-relaxed">
                예약이 확정되면 담당 드라이버가 배정됩니다.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
