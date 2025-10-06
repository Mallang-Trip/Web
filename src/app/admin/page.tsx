"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import {
  useApproveReservation,
  useRejectReservation,
  useAdminAllReservations,
} from "@/hooks/use-reservations";
import type { AdminReservationsData } from "@/hooks/use-reservations";
import { toast } from "sonner";
import Pagination from "./_component/pagination";
import ReservationTable, { type Row } from "./_component/reservation-table";
import DetailDialog from "./_component/detail-dialog";
import ApproveDialog from "./_component/approve-dialog";
import RejectDialog from "./_component/reject-dialog";
import Waiting from "./_component/waiting";

export default function AdminPage() {
  const { isAuthenticated, hasHydrated, requireAuth } = useAuth();
  const router = useRouter();

  // 페이지네이션 상태
  const [page, setPage] = useState(0);
  const limit = 50; // 기본 50 (최대 100)
  const offset = page * limit;

  const adminQuery = useAdminAllReservations({
    offset,
    limit,
    enabled: true,
  });

  const [rows, setRows] = useState<Row[]>([]);

  // 승인/반려 모달
  const [approveTarget, setApproveTarget] = useState<Row | null>(null);
  const [approveMemo, setApproveMemo] = useState("");
  const [rejectTarget, setRejectTarget] = useState<Row | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectMemo, setRejectMemo] = useState("");
  const [detailTarget, setDetailTarget] = useState<Row | null>(null);

  const approveMutation = useApproveReservation();
  const rejectMutation = useRejectReservation();

  // 인증 요구 (관리자 기능)
  useEffect(() => {
    if (!hasHydrated) return;
    requireAuth();
  }, [hasHydrated, requireAuth]);

  useEffect(() => {
    const apiData: AdminReservationsData | undefined = adminQuery.data as
      | AdminReservationsData
      | undefined;
    // 초기 페이지이며 오류가 발생한 경우 접근 불가 페이지로 이동 (history 대체)
    if (page === 0 && adminQuery.isError) {
      router.replace("/admin/notfound");
      return;
    }
    if (!apiData) return;
    const mapped: Row[] = (apiData.reservations || []).map((r) => {
      const rExtended = r as Record<string, unknown>;
      return {
        reservationId:
          r.reservationId ?? (r as unknown as { id?: number }).id ?? "",
        reservationName: String(r.reservationName ?? ""),
        email: String(r.email ?? ""),
        name: String(r.name ?? ""),
        phoneNumber: String(r.phoneNumber ?? ""),
        userCount: Number(r.userCount ?? 0),
        meetingDate: String(r.meetingDate ?? ""),
        pickupTime: String(r.pickupTime ?? ""),
        pickupAddress: String((r.pickupAddress as string | null) ?? ""),
        returnAddress: String((r.returnAddress as string | null) ?? ""),
        requests: (r.requests as string | null) ?? null,
        price: Number((r.price as number | string | undefined) ?? 0),
        status: String(r.status ?? "PENDING"),
        createdAt: String(r.createdAt ?? ""),
        isModifiable:
          (rExtended.isModifiable as boolean | undefined) ?? undefined,
        isCancelable:
          (rExtended.isCancelable as boolean | undefined) ?? undefined,
        adminMemo: (rExtended.adminMemo as string | null | undefined) ?? null,
        requestedAt:
          (rExtended.requestedAt as string | null | undefined) ?? null,
        approvedAt: (rExtended.approvedAt as string | null | undefined) ?? null,
        rejectedAt: (rExtended.rejectedAt as string | null | undefined) ?? null,
        canceledAt: (rExtended.canceledAt as string | null | undefined) ?? null,
      };
    });
    setRows(mapped);
  }, [adminQuery.data, adminQuery.isError, page, router]);

  const handleApprove = async () => {
    if (!approveTarget) return;
    try {
      await approveMutation.mutateAsync({
        reservationId: approveTarget.reservationId,
        adminMemo: approveMemo.trim() || undefined,
      });
      setRows((prev) =>
        prev.map((r) =>
          r.reservationId === approveTarget.reservationId
            ? { ...r, status: "APPROVED" }
            : r,
        ),
      );
      toast.success("예약이 승인되었습니다.");
      setApproveTarget(null);
      setDetailTarget(null);
      setApproveMemo("");
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string } | undefined;
      let desc = err?.message || "잠시 후 다시 시도해주세요.";
      if (err?.status === 404) desc = "예약을 찾을 수 없습니다.";
      else if (err?.status === 409) desc = "승인할 수 없는 상태입니다.";
      toast.error("예약 승인 실패", { description: desc });
    }
  };

  const handleReject = async () => {
    if (!rejectTarget) return;
    if (!rejectReason.trim()) {
      toast.error("반려 사유를 입력해주세요.");
      return;
    }
    try {
      await rejectMutation.mutateAsync({
        reservationId: rejectTarget.reservationId,
        reason: rejectReason.trim(),
        adminMemo: rejectMemo.trim() || undefined,
      });
      setRows((prev) =>
        prev.map((r) =>
          r.reservationId === rejectTarget.reservationId
            ? { ...r, status: "REJECTED" }
            : r,
        ),
      );
      toast.success("예약이 반려되었습니다.");
      setRejectTarget(null);
      setDetailTarget(null);
      setRejectReason("");
      setRejectMemo("");
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string } | undefined;
      let desc = err?.message || "잠시 후 다시 시도해주세요.";
      if (err?.status === 404) desc = "예약을 찾을 수 없습니다.";
      else if (err?.status === 409) desc = "반려할 수 없는 상태입니다.";
      toast.error("예약 반려 실패", { description: desc });
    }
  };

  if (!hasHydrated || !isAuthenticated) {
    return <Waiting hasHydrated={hasHydrated} />;
  }

  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold">관리자 - 예약 관리</h1>

        {/* 상단 요약 및 페이지네이션 컨트롤 */}
        <Pagination
          page={page}
          setPage={setPage}
          totalCount={
            (adminQuery.data as AdminReservationsData | undefined)
              ?.totalCount ?? 0
          }
          hasNext={
            (adminQuery.data as AdminReservationsData | undefined)?.hasNext ??
            false
          }
          isFetching={adminQuery.isFetching}
        />

        {/* 결과 테이블 */}
        <ReservationTable
          rows={rows}
          isFetching={adminQuery.isFetching}
          onRowClick={setDetailTarget}
          onApprove={setApproveTarget}
          onReject={setRejectTarget}
          isApproving={approveMutation.isPending}
          isRejecting={rejectMutation.isPending}
        />

        {/* 상세 보기 다이얼로그 */}
        <DetailDialog
          detailTarget={detailTarget}
          onClose={() => setDetailTarget(null)}
          onApprove={setApproveTarget}
          onReject={setRejectTarget}
          isApproving={approveMutation.isPending}
          isRejecting={rejectMutation.isPending}
        />

        {/* 승인 다이얼로그 */}
        <ApproveDialog
          approveTarget={approveTarget}
          onClose={() => setApproveTarget(null)}
          approveMemo={approveMemo}
          setApproveMemo={setApproveMemo}
          onApprove={handleApprove}
          isPending={approveMutation.isPending}
        />

        {/* 반려 다이얼로그 */}
        <RejectDialog
          rejectTarget={rejectTarget}
          onClose={() => setRejectTarget(null)}
          rejectReason={rejectReason}
          setRejectReason={setRejectReason}
          rejectMemo={rejectMemo}
          setRejectMemo={setRejectMemo}
          onReject={handleReject}
          isPending={rejectMutation.isPending}
        />
      </div>
    </div>
  );
}
