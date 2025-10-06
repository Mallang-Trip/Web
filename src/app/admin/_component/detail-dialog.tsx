"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Row } from "./reservation-table";

interface DetailDialogProps {
  detailTarget: Row | null;
  onClose: () => void;
  onApprove: (row: Row) => void;
  onReject: (row: Row) => void;
  isApproving: boolean;
  isRejecting: boolean;
}

export default function DetailDialog({
  detailTarget,
  onClose,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: DetailDialogProps) {
  return (
    <Dialog open={!!detailTarget} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-none bg-white sm:max-w-2xl">
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
              <div className="break-all">{detailTarget.reservationName}</div>
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
                {new Date(detailTarget.meetingDate).toLocaleString("ko-KR")} (
                {detailTarget.pickupTime})
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">픽업 주소</Label>
              <div className="break-words">{detailTarget.pickupAddress}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">복귀 주소</Label>
              <div className="break-words">{detailTarget.returnAddress}</div>
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
                  {new Date(detailTarget.requestedAt).toLocaleString("ko-KR")}
                </div>
              </div>
            )}
            {detailTarget.approvedAt && (
              <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                <Label className="text-gray-500">승인 일시</Label>
                <div>
                  {new Date(detailTarget.approvedAt).toLocaleString("ko-KR")}
                </div>
              </div>
            )}
            {detailTarget.rejectedAt && (
              <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                <Label className="text-gray-500">반려 일시</Label>
                <div>
                  {new Date(detailTarget.rejectedAt).toLocaleString("ko-KR")}
                </div>
              </div>
            )}
            {detailTarget.canceledAt && (
              <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                <Label className="text-gray-500">취소 일시</Label>
                <div>
                  {new Date(detailTarget.canceledAt).toLocaleString("ko-KR")}
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
                disabled={detailTarget.status !== "PENDING" || isApproving}
                onClick={() => onApprove(detailTarget)}
              >
                승인
              </Button>
              <Button
                variant="destructive"
                disabled={detailTarget.status !== "PENDING" || isRejecting}
                onClick={() => onReject(detailTarget)}
              >
                반려
              </Button>
            </>
          )}
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
