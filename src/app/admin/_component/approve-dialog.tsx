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

interface ApproveDialogProps {
  approveTarget: Row | null;
  onClose: () => void;
  approveMemo: string;
  setApproveMemo: (value: string) => void;
  onApprove: () => void;
  isPending: boolean;
}

export default function ApproveDialog({
  approveTarget,
  onClose,
  approveMemo,
  setApproveMemo,
  onApprove,
  isPending,
}: ApproveDialogProps) {
  return (
    <Dialog open={!!approveTarget} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="border-none bg-white">
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
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            취소
          </Button>
          <Button onClick={onApprove} disabled={isPending}>
            {isPending ? "처리 중..." : "승인"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
