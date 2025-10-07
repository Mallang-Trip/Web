import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { toast } from "sonner";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Driver {
  name: string;
  phoneNumber: string;
  vehicleNumber: string;
  vehicleImageUrls?: string[];
}

interface DriverInfoCardProps {
  status: string;
  attributes: {
    driver?: Driver | null;
    breweries?: Array<{
      order: number;
      breweryName: string;
      address: string;
    }> | null;
  } | null;
}

export default function DriverInfoCard({
  status,
  attributes,
}: DriverInfoCardProps) {
  const isApproved = (status || "").toUpperCase() === "APPROVED";
  const driver = attributes?.driver || null;
  const breweries = attributes?.breweries || null;

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
      <CardContent className="space-y-6">
        {isApproved && driver ? (
          <>
            <DriverInfo driver={driver} />
            {breweries && breweries.length > 0 && (
              <BreweryInfo breweries={breweries} />
            )}
          </>
        ) : (
          <NoDriver />
        )}
      </CardContent>
    </Card>
  );
}

// 드라이버 정보 표시 컴포넌트
function DriverInfo({ driver }: { driver: Driver }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(driver.phoneNumber);
      toast.success("전화번호가 복사되었습니다.", {
        description: driver.phoneNumber,
      });
    } catch {
      toast.error("복사에 실패했습니다.");
    }
  };

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setViewerOpen(true);
  };

  const goToPrevious = () => {
    const imageUrls = driver.vehicleImageUrls || [];
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    const imageUrls = driver.vehicleImageUrls || [];
    setCurrentImageIndex((prev) =>
      prev === imageUrls.length - 1 ? 0 : prev + 1,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  const vehicleImageUrls = driver.vehicleImageUrls || [];

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop"
            alt="드라이버/차량"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{driver.name}</h3>

            {/* 차량 번호 */}
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <VehicleIcon />
              {driver.vehicleNumber}
            </p>

            {/* 전화번호 및 복사 버튼 */}
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <PhoneIcon />
              {driver.phoneNumber}
              <button
                onClick={handleCopyPhone}
                className="ml-1 rounded p-1 hover:bg-gray-100"
                title="전화번호 복사"
                aria-label="전화번호 복사"
              >
                <CopyIcon />
              </button>
            </div>
          </div>
        </div>

        {/* 차량 이미지 갤러리 */}
        {vehicleImageUrls.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ImageIcon />
              <span className="font-medium">
                차량 사진 ({vehicleImageUrls.length}장)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {vehicleImageUrls.map((url, index) => (
                <div
                  key={index}
                  className="group hover:border-primary relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md"
                  onClick={() => openImageViewer(index)}
                >
                  <Image
                    src={url}
                    alt={`차량 이미지 ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 33vw, 25vw"
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 이미지 뷰어 */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent
          className="max-w-[95vw] border-none bg-black/95 p-0 sm:max-w-7xl"
          onKeyDown={handleKeyDown}
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">차량 이미지</DialogTitle>
          <div className="relative flex h-[85vh] items-center justify-center sm:h-[90vh]">
            <button
              onClick={() => setViewerOpen(false)}
              className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            {vehicleImageUrls.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="relative h-full w-full">
              <Image
                src={vehicleImageUrls[currentImageIndex] || ""}
                alt={`차량 이미지 ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 640px) 95vw, 90vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
              {currentImageIndex + 1} / {vehicleImageUrls.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// 양조장 정보 표시 컴포넌트
function BreweryInfo({
  breweries,
}: {
  breweries: Array<{
    order: number;
    breweryName: string;
    address: string;
  }>;
}) {
  // order 순서대로 정렬
  const sortedBreweries = [...breweries].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-3 border-t border-gray-300 pt-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <BreweryIcon />
        방문 양조장 ({sortedBreweries.length}곳)
      </div>
      <div className="space-y-3">
        {sortedBreweries.map((brewery) => (
          <div
            key={brewery.order}
            className="rounded-lg border border-gray-200 bg-gray-50 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600">
                {brewery.order}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-gray-900">
                  {brewery.breweryName}
                </h4>
                <p className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPinIcon />
                  {brewery.address}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 드라이버 미배정 상태 표시 컴포넌트
function NoDriver() {
  return (
    <div className="flex items-start gap-3 text-sm text-gray-600">
      <InfoIcon />
      <div>
        <p className="font-medium text-gray-900">담당 드라이버 미배정</p>
        <p className="mt-1 leading-relaxed">
          예약이 확정되면 담당 드라이버가 배정됩니다.
        </p>
      </div>
    </div>
  );
}

// SVG 아이콘 컴포넌트들
function VehicleIcon() {
  return (
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
  );
}

function PhoneIcon() {
  return (
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
  );
}

function CopyIcon() {
  return (
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
  );
}

function InfoIcon() {
  return (
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
  );
}

function ImageIcon() {
  return (
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
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function BreweryIcon() {
  return (
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
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
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
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
