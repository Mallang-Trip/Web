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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Row } from "./reservation-table";

interface RejectDialogProps {
  rejectTarget: Row | null;
  onClose: () => void;
  rejectReason: string;
  setRejectReason: (value: string) => void;
  rejectMemo: string;
  setRejectMemo: (value: string) => void;
  onReject: () => void;
  isPending: boolean;
}

export default function RejectDialog({
  rejectTarget,
  onClose,
  rejectReason,
  setRejectReason,
  rejectMemo,
  setRejectMemo,
  onReject,
  isPending,
}: RejectDialogProps) {
  return (
    <Dialog open={!!rejectTarget} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="border-none bg-white">
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
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            취소
          </Button>
          <Button variant="destructive" onClick={onReject} disabled={isPending}>
            {isPending ? "처리 중..." : "반려"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
