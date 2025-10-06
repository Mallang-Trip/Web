"use client";

import { Button } from "@/components/ui/button";

export type Row = {
  reservationId: number | string;
  reservationName: string;
  email: string;
  name: string;
  phoneNumber: string;
  userCount: number;
  meetingDate: string;
  pickupTime: string;
  pickupAddress: string;
  returnAddress: string;
  requests?: string | null;
  price: number;
  status: string;
  createdAt: string;
  isModifiable?: boolean;
  isCancelable?: boolean;
  adminMemo?: string | null;
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
};

interface ReservationTableProps {
  rows: Row[];
  isFetching: boolean;
  onRowClick: (row: Row) => void;
  onApprove: (row: Row) => void;
  onReject: (row: Row) => void;
  isApproving: boolean;
  isRejecting: boolean;
}

export default function ReservationTable({
  rows,
  isFetching,
  onRowClick,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: ReservationTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">예약명</th>
            <th className="px-4 py-2">예약자</th>
            <th className="px-4 py-2">연락처</th>
            <th className="px-4 py-2">일시</th>
            <th className="px-4 py-2">픽업/복귀</th>
            <th className="px-4 py-2">금액</th>
            <th className="px-4 py-2">상태</th>
            <th className="px-4 py-2">액션</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan={9}>
                {isFetching ? "불러오는 중..." : "조회 결과가 없습니다."}
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr
                key={r.reservationId}
                className="cursor-pointer border-t border-t-gray-200 hover:bg-gray-50"
                onClick={() => onRowClick(r)}
              >
                <td className="px-4 py-3">{r.reservationId}</td>
                <td className="px-4 py-3">{r.reservationName}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.email}</div>
                </td>
                <td className="px-4 py-3">{r.phoneNumber}</td>
                <td className="px-4 py-3">
                  <div>
                    {new Date(r.meetingDate).toLocaleDateString("ko-KR")}
                  </div>
                  <div className="text-xs text-gray-500">{r.pickupTime}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="line-clamp-1" title={r.pickupAddress}>
                    {r.pickupAddress}
                  </div>
                  <div
                    className="line-clamp-1 text-xs text-gray-500"
                    title={r.returnAddress}
                  >
                    {r.returnAddress}
                  </div>
                </td>
                <td className="px-4 py-3">
                  ₩{Number(r.price).toLocaleString()}
                </td>
                <td className="px-4 py-3">{r.status}</td>
                <td
                  className="px-4 py-3"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      disabled={r.status !== "PENDING" || isApproving}
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove(r);
                      }}
                    >
                      승인
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={r.status !== "PENDING" || isRejecting}
                      onClick={(e) => {
                        e.stopPropagation();
                        onReject(r);
                      }}
                    >
                      반려
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
