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
import { useTranslation } from "@/hooks/use-translation";
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
  const { t } = useTranslation();

  return (
    <Dialog open={!!rejectTarget} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="border-none bg-white">
        <DialogHeader>
          <DialogTitle>{t.admin.reject.title}</DialogTitle>
          <DialogDescription>{t.admin.reject.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div>
            <Label className="mb-1 block">
              {t.admin.reject.reasonRequired}
            </Label>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-1 block">{t.admin.reject.adminMemo}</Label>
            <Textarea
              value={rejectMemo}
              onChange={(e) => setRejectMemo(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex w-full flex-shrink-0 gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isPending}
          >
            {t.admin.button.cancel}
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onReject}
            disabled={isPending}
          >
            {isPending ? t.admin.button.processing : t.admin.button.reject}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
