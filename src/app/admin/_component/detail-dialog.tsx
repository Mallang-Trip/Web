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
import { useTranslation } from "@/hooks/use-translation";
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
  const { t, lang } = useTranslation();

  return (
    <Dialog open={!!detailTarget} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-none bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t.admin.detail.title}</DialogTitle>
          <DialogDescription>{t.admin.detail.description}</DialogDescription>
        </DialogHeader>
        {detailTarget && (
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">
                {t.admin.detail.reservationId}
              </Label>
              <div className="break-all">{detailTarget.reservationId}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">
                {t.admin.detail.reservationName}
              </Label>
              <div className="break-all">{detailTarget.reservationName}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">{t.admin.detail.email}</Label>
              <div className="break-all">{detailTarget.email}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">
                {t.admin.detail.reservedBy}
              </Label>
              <div>{detailTarget.name}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">{t.admin.detail.contact}</Label>
              <div className="break-all">{detailTarget.phoneNumber}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">{t.admin.detail.people}</Label>
              <div>{detailTarget.userCount}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">
                {t.admin.detail.meetingTime}
              </Label>
              <div>
                {new Date(detailTarget.meetingDate).toLocaleString(
                  lang === "ko" ? "ko-KR" : "en-US",
                )}{" "}
                ({detailTarget.pickupTime})
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">
                {t.admin.detail.pickupAddress}
              </Label>
              <div className="break-words">{detailTarget.pickupAddress}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">
                {t.admin.detail.returnAddress}
              </Label>
              <div className="break-words">{detailTarget.returnAddress}</div>
            </div>
            {detailTarget.requests && (
              <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                <Label className="text-gray-500">
                  {t.admin.detail.requests}
                </Label>
                <div className="break-words whitespace-pre-wrap">
                  {detailTarget.requests}
                </div>
              </div>
            )}
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">{t.admin.detail.amount}</Label>
              <div>
                {lang === "ko" ? "₩" : "$"}
                {Number(detailTarget.price).toLocaleString()}
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">{t.admin.detail.status}</Label>
              <div>{detailTarget.status}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-2">
              <Label className="text-gray-500">
                {t.admin.detail.createdAt}
              </Label>
              <div>
                {new Date(detailTarget.createdAt).toLocaleString(
                  lang === "ko" ? "ko-KR" : "en-US",
                )}
              </div>
            </div>
            {detailTarget.requestedAt && (
              <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                <Label className="text-gray-500">
                  {t.admin.detail.requestedAt}
                </Label>
                <div>
                  {new Date(detailTarget.requestedAt).toLocaleString(
                    lang === "ko" ? "ko-KR" : "en-US",
                  )}
                </div>
              </div>
            )}
            {detailTarget.approvedAt && (
              <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                <Label className="text-gray-500">
                  {t.admin.detail.approvedAt}
                </Label>
                <div>
                  {new Date(detailTarget.approvedAt).toLocaleString(
                    lang === "ko" ? "ko-KR" : "en-US",
                  )}
                </div>
              </div>
            )}
            {detailTarget.rejectedAt && (
              <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                <Label className="text-gray-500">
                  {t.admin.detail.rejectedAt}
                </Label>
                <div>
                  {new Date(detailTarget.rejectedAt).toLocaleString(
                    lang === "ko" ? "ko-KR" : "en-US",
                  )}
                </div>
              </div>
            )}
            {detailTarget.canceledAt && (
              <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                <Label className="text-gray-500">
                  {t.admin.detail.canceledAt}
                </Label>
                <div>
                  {new Date(detailTarget.canceledAt).toLocaleString(
                    lang === "ko" ? "ko-KR" : "en-US",
                  )}
                </div>
              </div>
            )}
            {detailTarget.adminMemo && (
              <div className="grid grid-cols-[140px_1fr] items-start gap-2">
                <Label className="text-gray-500">
                  {t.admin.detail.adminMemo}
                </Label>
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
                {t.admin.button.approve}
              </Button>
              <Button
                variant="destructive"
                disabled={detailTarget.status !== "PENDING" || isRejecting}
                onClick={() => onReject(detailTarget)}
              >
                {t.admin.button.reject}
              </Button>
            </>
          )}
          <Button variant="outline" onClick={onClose}>
            {t.admin.button.close}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
