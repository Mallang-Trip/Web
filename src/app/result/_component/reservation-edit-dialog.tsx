"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUpdateReservation } from "@/hooks/use-reservations";
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { track } from "@/lib/analytics";
import { useTranslation } from "@/hooks/use-translation";

interface Reservation {
  reservationId: string | number;
  reservationName: string;
  meetingDate: string;
  pickupTime: string;
  pickupAddress: string;
  returnAddress: string;
  requests: string | null;
  price: number;
  status: string;
  isModifiable?: boolean;
  isCancelable?: boolean;
  createdAt: string;
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
  email?: string;
  name?: string;
  phoneNumber?: string;
  userCount?: number;
  tripName?: string;
  startTime?: string;
  endTime?: string;
  pickupLocation?: string;
  dropLocation?: string;
  courseDetail?: string;
  tripStatus?: string;
  paymentStatus?: string;
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation;
  onSaved: (updated: Reservation) => void;
};

// VIP 가격표
const VIP_PRICES: Record<string, number> = {
  "2": 1160000,
  "3": 1185000,
  "4": 1260000,
  "5": 1335000,
  "6": 1520000,
  "7": 1610000,
  "8": 1700000,
};

export default function ReservationEditDialog({
  open,
  onOpenChange,
  reservation,
  onSaved,
}: Props) {
  const updateMutation = useUpdateReservation();
  const [isSaving, setIsSaving] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { t } = useTranslation();
  const tEdit = t.result.editDialog;

  const handleOpenChange = (newOpen: boolean) => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      activeElement.blur();
    }
    onOpenChange(newOpen);
  };

  const [form, setForm] = useState({
    reservationName: reservation.reservationName || reservation.tripName || "",
    userCount: String(reservation.userCount ?? 2),
    meetingDate: reservation.meetingDate?.split("T")[0] || "",
    pickupTime: reservation.pickupTime || "",
    pickupAddress:
      reservation.pickupAddress || reservation.pickupLocation || "",
    returnAddress: reservation.returnAddress || reservation.dropLocation || "",
    requests: reservation.requests || reservation.courseDetail || "",
    price: reservation.price || 0,
  });

  // 초기 값 세팅
  useEffect(() => {
    let isoDate = "";
    let hhmm = "";
    if (reservation.meetingDate) {
      const raw = reservation.meetingDate;
      isoDate = raw.includes("T") ? raw.split("T")[0] : raw;
      const t =
        reservation.pickupTime ||
        (raw.includes("T") ? raw.split("T")[1].slice(0, 5) : "");
      hhmm = t || "09:00";
    } else if (reservation.startTime) {
      const d = new Date(reservation.startTime);
      if (!Number.isNaN(d.getTime())) {
        isoDate = d.toISOString().split("T")[0];
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        hhmm = `${hh}:${mm}`;
      }
    }
    setForm({
      reservationName:
        reservation.reservationName || reservation.tripName || "",
      userCount: String(reservation.userCount ?? 2),
      meetingDate: isoDate || "",
      pickupTime: hhmm || "09:00",
      price: reservation.price ?? 0,
      pickupAddress:
        reservation.pickupAddress || reservation.pickupLocation || "",
      returnAddress:
        reservation.returnAddress || reservation.dropLocation || "",
      requests: reservation.requests || reservation.courseDetail || "",
    });
  }, [reservation]);

  // 인원 변경 시 가격 자동 반영
  useEffect(() => {
    const raw = form.userCount;
    if (!raw) return;
    if (raw === "9+") {
      toast.error(tEdit.groupContactError);
      return;
    }
    const count = raw as keyof typeof VIP_PRICES;
    if (VIP_PRICES[count] !== undefined) {
      setForm((p) => ({ ...p, price: VIP_PRICES[count] }));
    }
  }, [form.userCount, tEdit.groupContactError]);

  const isValid = useMemo(() => {
    const validCount = form.userCount !== "9+" && Number(form.userCount) > 0;
    return (
      form.reservationName.trim() !== "" &&
      form.meetingDate !== "" &&
      form.pickupTime !== "" &&
      form.pickupAddress.trim() !== "" &&
      form.returnAddress.trim() !== "" &&
      validCount &&
      Number(form.price) >= 0
    );
  }, [form]);

  const handleSave = async () => {
    if (!isValid) return;
    setIsSaving(true);
    try {
      const body = {
        reservationName: form.reservationName.trim(),
        userCount: form.userCount === "9+" ? undefined : Number(form.userCount),
        meetingDate: `${form.meetingDate}T${form.pickupTime}:00`,
        pickupTime: form.pickupTime,
        pickupAddress: form.pickupAddress.trim(),
        returnAddress: form.returnAddress.trim(),
        requests: form.requests?.trim() || undefined,
        price: Number(form.price),
        email: reservation.email || undefined,
        name: reservation.name || undefined,
        phoneNumber: reservation.phoneNumber || undefined,
      } as Record<string, unknown>;

      const updated = await updateMutation.mutateAsync({
        reservationId: reservation.reservationId,
        body,
      });

      const u = updated as unknown as {
        reservationId?: number;
        id?: number;
        reservationName?: string;
        meetingDate?: string;
        pickupTime?: string;
        pickupAddress?: string;
        returnAddress?: string;
        requests?: string | null;
        price?: number;
        status?: string;
        isCancelable?: boolean;
        isModifiable?: boolean;
        createdAt?: string;
        requestedAt?: string | null;
        approvedAt?: string | null;
        rejectedAt?: string | null;
        canceledAt?: string | null;
      };

      const next: Reservation = {
        reservationId: u.reservationId ?? u.id ?? reservation.reservationId,
        reservationName: u.reservationName || form.reservationName,
        meetingDate:
          u.meetingDate || `${form.meetingDate}T${form.pickupTime}:00`,
        pickupTime: u.pickupTime || form.pickupTime,
        pickupAddress: u.pickupAddress || form.pickupAddress,
        returnAddress: u.returnAddress || form.returnAddress,
        requests: u.requests ?? form.requests,
        price: Number(u.price ?? form.price),
        status: (u.status as string) || reservation.status || "PENDING",
        isCancelable: u.isCancelable ?? reservation.isCancelable ?? false,
        isModifiable: u.isModifiable ?? reservation.isModifiable ?? false,
        createdAt: u.createdAt || reservation.createdAt,
        requestedAt: u.requestedAt ?? reservation.requestedAt,
        approvedAt: u.approvedAt ?? reservation.approvedAt,
        rejectedAt: u.rejectedAt ?? reservation.rejectedAt,
        canceledAt: u.canceledAt ?? reservation.canceledAt,
        email: reservation.email,
        name: reservation.name,
        phoneNumber: reservation.phoneNumber,
        userCount: reservation.userCount,
      } as Reservation;

      onSaved(next as Reservation);
      toast.success(tEdit.updateSuccess);
      try {
        track("edit_reservation", {
          reservation_id: next.reservationId,
          value: next.price,
        });
      } catch {}
      onOpenChange(false);
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string } | undefined;
      let desc = err?.message || tEdit.tryAgain;
      if (err?.status === 404) desc = tEdit.notFound;
      else if (err?.status === 409) desc = tEdit.cannotModify;
      toast.error(tEdit.updateError, { description: desc });
    } finally {
      setIsSaving(false);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-h-[80vh] max-w-lg overflow-y-auto border-none bg-white"
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            const hasOpenPopover = document.querySelector(
              "[data-radix-popper-content-wrapper]",
            );
            if (hasOpenPopover) {
              e.preventDefault();
            }
          }}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>{tEdit.title}</DialogTitle>
          </DialogHeader>
          <div className="px-1 pb-4">
            <p className="mb-3 text-sm text-gray-500">{tEdit.pendingOnly}</p>
            <FormBody form={form} setForm={setForm} />
          </div>
          <FormActions
            onCancel={() => onOpenChange(false)}
            onSave={handleSave}
            isValid={isValid}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent
        className="flex h-[100dvh] max-h-[100dvh] flex-col border-none bg-white data-[vaul-drawer-direction=bottom]:mt-0 data-[vaul-drawer-direction=bottom]:max-h-[100dvh]"
        aria-describedby={undefined}
        onInteractOutside={(e) => {
          const hasOpenPopover = document.querySelector(
            "[data-radix-popper-content-wrapper]",
          );
          if (hasOpenPopover) {
            e.preventDefault();
          }
        }}
      >
        <DrawerHeader className="flex-shrink-0 text-left">
          <DrawerTitle>{tEdit.title}</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-auto px-4 pb-4">
          <p className="mb-3 text-sm text-gray-500">{tEdit.pendingOnlyFull}</p>
          <FormBody form={form} setForm={setForm} />
        </div>

        <FormActions
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
          isValid={isValid}
          isSaving={isSaving}
        />
      </DrawerContent>
    </Drawer>
  );
}

// 폼 본문 컴포넌트
function FormBody({
  form,
  setForm,
}: {
  form: {
    reservationName: string;
    userCount: string;
    meetingDate: string;
    pickupTime: string;
    pickupAddress: string;
    returnAddress: string;
    requests: string;
    price: number;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      reservationName: string;
      userCount: string;
      meetingDate: string;
      pickupTime: string;
      pickupAddress: string;
      returnAddress: string;
      requests: string;
      price: number;
    }>
  >;
}) {
  const { t, lang } = useTranslation();
  const tEdit = t.result.editDialog;
  const currencyLabel = lang === "en" ? "$" : "₩";

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1 block">{tEdit.reservationName}</Label>
        <Input
          value={form.reservationName}
          onChange={(e) =>
            setForm((p) => ({ ...p, reservationName: e.target.value }))
          }
          disabled
          readOnly
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="mb-1 block">{tEdit.meetingDate}</Label>
          <DatePicker
            value={form.meetingDate}
            onChange={(v) => setForm((prev) => ({ ...prev, meetingDate: v }))}
            minDate={new Date()}
            modal={true}
          />
        </div>
        <div>
          <Label className="mb-1 block">{tEdit.meetingTime}</Label>
          <TimePicker
            value={form.pickupTime}
            onChange={(v) => setForm((prev) => ({ ...prev, pickupTime: v }))}
            modal={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="mb-1 block">{tEdit.participants}</Label>
          <Combobox
            value={form.userCount}
            onChange={(v) => setForm((p) => ({ ...p, userCount: v || "" }))}
            options={[
              { value: "", label: tEdit.participantPlaceholder },
              { value: "2", label: tEdit.people2 },
              { value: "3", label: tEdit.people3 },
              { value: "4", label: tEdit.people4 },
              { value: "5", label: tEdit.people5 },
              { value: "6", label: tEdit.people6 },
              { value: "7", label: tEdit.people7 },
              { value: "8", label: tEdit.people8 },
              { value: "9+", label: tEdit.people9Plus },
            ]}
            widthClassName="w-full"
            buttonClassName="h-9 text-sm justify-between"
            disabled
            modal={true}
          />
        </div>
        <div>
          <Label className="mb-1 block">
            {tEdit.totalAmount
              .replace("$", currencyLabel)
              .replace("₩", currencyLabel)}
          </Label>
          <Input type="number" min={0} value={form.price} disabled readOnly />
        </div>
      </div>
      <div>
        <Label className="mb-1 block">{tEdit.pickupAddress}</Label>
        <Textarea
          value={form.pickupAddress}
          onChange={(e) =>
            setForm((p) => ({ ...p, pickupAddress: e.target.value }))
          }
        />
      </div>
      <div>
        <Label className="mb-1 block">{tEdit.returnAddress}</Label>
        <Textarea
          value={form.returnAddress}
          onChange={(e) =>
            setForm((p) => ({ ...p, returnAddress: e.target.value }))
          }
        />
      </div>
      <div>
        <Label className="mb-1 block">{tEdit.requests}</Label>
        <Textarea
          value={form.requests}
          onChange={(e) => setForm((p) => ({ ...p, requests: e.target.value }))}
        />
      </div>
    </div>
  );
}

// 폼 액션 버튼
function FormActions({
  onCancel,
  onSave,
  isValid,
  isSaving,
}: {
  onCancel: () => void;
  onSave: () => void;
  isValid: boolean;
  isSaving: boolean;
}) {
  const { t } = useTranslation();
  const tEdit = t.result.editDialog;

  return (
    <div className="flex w-full flex-shrink-0 gap-2 px-1 py-3">
      <Button
        variant="outline"
        className="flex-1"
        onClick={onCancel}
        disabled={isSaving}
      >
        {tEdit.cancel}
      </Button>
      <Button
        className="flex-1"
        onClick={onSave}
        disabled={!isValid || isSaving}
      >
        {isSaving ? tEdit.saving : tEdit.save}
      </Button>
    </div>
  );
}
