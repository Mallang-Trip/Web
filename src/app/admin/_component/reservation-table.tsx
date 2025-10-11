"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";

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
  const { t, lang } = useTranslation();

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-2">{t.admin.table.id}</th>
            <th className="px-4 py-2">{t.admin.table.reservationName}</th>
            <th className="px-4 py-2">{t.admin.table.reservedBy}</th>
            <th className="px-4 py-2">{t.admin.table.contact}</th>
            <th className="px-4 py-2">{t.admin.table.datetime}</th>
            <th className="px-4 py-2">{t.admin.table.pickupReturn}</th>
            <th className="px-4 py-2">{t.admin.table.amount}</th>
            <th className="px-4 py-2">{t.admin.table.status}</th>
            <th className="px-4 py-2">{t.admin.table.action}</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan={9}>
                {isFetching
                  ? t.admin.pagination.loading
                  : t.admin.table.noResults}
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
                    {new Date(r.meetingDate).toLocaleDateString(
                      lang === "ko" ? "ko-KR" : "en-US",
                    )}
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
                  {lang === "ko" ? "₩" : "$"}
                  {Number(r.price).toLocaleString()}
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
                      {t.admin.button.approve}
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
                      {t.admin.button.reject}
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
