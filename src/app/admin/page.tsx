"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import {
  useApproveReservation,
  useRejectReservation,
  useAdminAllReservations,
} from "@/hooks/use-reservations";
import type { AdminReservationsData } from "@/hooks/use-reservations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Row = {
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
    const mapped: Row[] = (apiData.reservations || []).map((r) => ({
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
      isModifiable: (r as any).isModifiable ?? undefined,
      isCancelable: (r as any).isCancelable ?? undefined,
      adminMemo: (r as any).adminMemo ?? null,
      requestedAt: (r as any).requestedAt ?? null,
      approvedAt: (r as any).approvedAt ?? null,
      rejectedAt: (r as any).rejectedAt ?? null,
      canceledAt: (r as any).canceledAt ?? null,
    }));
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
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <p className="text-gray-600">
              {!hasHydrated ? "데이터 로딩 중..." : "인증 확인 중..."}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold">관리자: 예약 관리</h1>

        {/* 상단 요약 및 페이지네이션 컨트롤 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            총{" "}
            {(adminQuery.data as AdminReservationsData | undefined)
              ?.totalCount ?? 0}
            건
            {adminQuery.isFetching && (
              <span className="ml-2 text-gray-400">(불러오는 중...)</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0 || adminQuery.isFetching}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              이전
            </Button>
            <div className="px-2 text-sm text-gray-600">페이지 {page + 1}</div>
            <Button
              variant="outline"
              size="sm"
              disabled={
                !(
                  (adminQuery.data as AdminReservationsData | undefined)
                    ?.hasNext ?? false
                ) || adminQuery.isFetching
              }
              onClick={() => setPage((p) => p + 1)}
            >
              다음
            </Button>
          </div>
        </div>

        {/* 결과 테이블 */}
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
                  <td
                    className="px-4 py-6 text-center text-gray-500"
                    colSpan={9}
                  >
                    {adminQuery.isFetching
                      ? "불러오는 중..."
                      : "조회 결과가 없습니다."}
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr
                    key={r.reservationId}
                    className="cursor-pointer border-t hover:bg-gray-50"
                    onClick={() => setDetailTarget(r)}
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
                      <div className="text-xs text-gray-500">
                        {r.pickupTime}
                      </div>
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
                          disabled={
                            r.status !== "PENDING" || approveMutation.isPending
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            setApproveTarget(r);
                          }}
                        >
                          승인
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={
                            r.status !== "PENDING" || rejectMutation.isPending
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            setRejectTarget(r);
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

        {/* 승인 다이얼로그 */}
        {/* 상세 보기 다이얼로그 */}
        <Dialog
          open={!!detailTarget}
          onOpenChange={(o) => !o && setDetailTarget(null)}
        >
          <DialogContent className="max-h-[85vh] overflow-y-auto bg-white sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>예약 상세 정보</DialogTitle>
              <DialogDescription>
                예약 내역의 전체 정보를 확인할 수 있습니다.
              </DialogDescription>
            </DialogHeader>
            {detailTarget && (
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">예약 ID</Label>
                  <div className="break-all">{detailTarget.reservationId}</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">예약명</Label>
                  <div className="break-all">
                    {detailTarget.reservationName}
                  </div>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">이메일</Label>
                  <div className="break-all">{detailTarget.email}</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">예약자</Label>
                  <div>{detailTarget.name}</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">연락처</Label>
                  <div className="break-all">{detailTarget.phoneNumber}</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">인원</Label>
                  <div>{detailTarget.userCount}</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">미팅 일시</Label>
                  <div>
                    {new Date(detailTarget.meetingDate).toLocaleString("ko-KR")}{" "}
                    ({detailTarget.pickupTime})
                  </div>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">픽업 주소</Label>
                  <div className="break-words">
                    {detailTarget.pickupAddress}
                  </div>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">복귀 주소</Label>
                  <div className="break-words">
                    {detailTarget.returnAddress}
                  </div>
                </div>
                {detailTarget.requests && (
                  <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                    <Label className="text-gray-500">요청사항</Label>
                    <div className="break-words whitespace-pre-wrap">
                      {detailTarget.requests}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">금액</Label>
                  <div>₩{Number(detailTarget.price).toLocaleString()}</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">상태</Label>
                  <div>{detailTarget.status}</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                  <Label className="text-gray-500">생성 일시</Label>
                  <div>
                    {new Date(detailTarget.createdAt).toLocaleString("ko-KR")}
                  </div>
                </div>
                {detailTarget.requestedAt && (
                  <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                    <Label className="text-gray-500">예약 일시</Label>
                    <div>
                      {new Date(detailTarget.requestedAt).toLocaleString(
                        "ko-KR",
                      )}
                    </div>
                  </div>
                )}
                {detailTarget.approvedAt && (
                  <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                    <Label className="text-gray-500">승인 일시</Label>
                    <div>
                      {new Date(detailTarget.approvedAt).toLocaleString(
                        "ko-KR",
                      )}
                    </div>
                  </div>
                )}
                {detailTarget.rejectedAt && (
                  <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                    <Label className="text-gray-500">반려 일시</Label>
                    <div>
                      {new Date(detailTarget.rejectedAt).toLocaleString(
                        "ko-KR",
                      )}
                    </div>
                  </div>
                )}
                {detailTarget.canceledAt && (
                  <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                    <Label className="text-gray-500">취소 일시</Label>
                    <div>
                      {new Date(detailTarget.canceledAt).toLocaleString(
                        "ko-KR",
                      )}
                    </div>
                  </div>
                )}
                {detailTarget.adminMemo && (
                  <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                    <Label className="text-gray-500">관리자 메모</Label>
                    <div className="break-words whitespace-pre-wrap">
                      {detailTarget.adminMemo}
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              {detailTarget && (
                <>
                  <Button
                    disabled={
                      detailTarget.status !== "PENDING" ||
                      approveMutation.isPending
                    }
                    onClick={() => setApproveTarget(detailTarget)}
                  >
                    승인
                  </Button>
                  <Button
                    variant="destructive"
                    disabled={
                      detailTarget.status !== "PENDING" ||
                      rejectMutation.isPending
                    }
                    onClick={() => setRejectTarget(detailTarget)}
                  >
                    반려
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setDetailTarget(null)}>
                닫기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 승인 다이얼로그 */}
        <Dialog
          open={!!approveTarget}
          onOpenChange={(o) => !o && setApproveTarget(null)}
        >
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>예약 승인</DialogTitle>
              <DialogDescription>
                관리자 메모를 입력할 수 있습니다 (선택)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <Label className="mb-1 block">관리자 메모</Label>
              <Textarea
                value={approveMemo}
                onChange={(e) => setApproveMemo(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setApproveTarget(null)}
                disabled={approveMutation.isPending}
              >
                취소
              </Button>
              <Button
                onClick={handleApprove}
                disabled={approveMutation.isPending}
              >
                {approveMutation.isPending ? "처리 중..." : "승인"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 반려 다이얼로그 */}
        <Dialog
          open={!!rejectTarget}
          onOpenChange={(o) => !o && setRejectTarget(null)}
        >
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>예약 반려</DialogTitle>
              <DialogDescription>
                반려 사유는 필수이며, 관리자 메모는 선택입니다.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div>
                <Label className="mb-1 block">반려 사유 *</Label>
                <Textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-1 block">관리자 메모</Label>
                <Textarea
                  value={rejectMemo}
                  onChange={(e) => setRejectMemo(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRejectTarget(null)}
                disabled={rejectMutation.isPending}
              >
                취소
              </Button>
              <Button
                onClick={handleReject}
                disabled={rejectMutation.isPending}
              >
                {rejectMutation.isPending ? "처리 중..." : "반려"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
