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

interface Reservation {
  reservationId: string | number;
  // 새 스키마 필드
  reservationName: string;
  meetingDate: string; // ISO 8601
  pickupTime: string; // HH:mm
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
  // 구 스키마 호환 필드 (폴백용)
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

export default function ReservationEditDialog({
  open,
  onOpenChange,
  reservation,
  onSaved,
}: Props) {
  const updateMutation = useUpdateReservation();
  const [isSaving, setIsSaving] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (newOpen: boolean) => {
    // Dialog/Drawer가 열리거나 닫힐 때 포커스를 정리
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      activeElement.blur();
    }
    onOpenChange(newOpen);
  };

  // VIP 가격표 (booking-form과 동일)
  const vipPrices = useMemo(
    () => ({
      "2": 1160000,
      "3": 1185000,
      "4": 1260000,
      "5": 1335000,
      "6": 1520000,
      "7": 1610000,
      "8": 1700000,
    }),
    [],
  );

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
    // meetingDate / pickupTime 우선, 없으면 startTime 파싱
    let isoDate = form.meetingDate;
    let hhmm = form.pickupTime;
    if (!isoDate) {
      if (reservation.meetingDate) {
        const raw = reservation.meetingDate;
        isoDate = raw.includes("T") ? raw.split("T")[0] : raw;
        if (!hhmm) {
          const t =
            reservation.pickupTime ||
            (raw.includes("T") ? raw.split("T")[1].slice(0, 5) : "");
          hhmm = t || "09:00";
        }
      } else if (reservation.startTime) {
        const d = new Date(reservation.startTime);
        if (!Number.isNaN(d.getTime())) {
          isoDate = d.toISOString().split("T")[0];
          const hh = String(d.getHours()).padStart(2, "0");
          const mm = String(d.getMinutes()).padStart(2, "0");
          hhmm = `${hh}:${mm}`;
        }
      }
    }
    setForm((prev) => ({
      ...prev,
      reservationName:
        reservation.reservationName ||
        reservation.tripName ||
        prev.reservationName,
      meetingDate: isoDate || prev.meetingDate,
      pickupTime: hhmm || prev.pickupTime || "09:00",
      price: reservation.price ?? prev.price,
      pickupAddress:
        reservation.pickupAddress ||
        reservation.pickupLocation ||
        prev.pickupAddress,
      returnAddress:
        reservation.returnAddress ||
        reservation.dropLocation ||
        prev.returnAddress,
      requests:
        reservation.requests || reservation.courseDetail || prev.requests,
    }));
  }, [reservation]);

  // 인원 변경 시 가격 자동 반영 (9+는 안내 후 고정)
  useEffect(() => {
    const raw = form.userCount;
    if (!raw) return;
    if (raw === "9+") {
      toast.error("9인 이상 단체는 고객센터로 문의해주세요.");
      return;
    }
    const count = raw as keyof typeof vipPrices;
    if (vipPrices[count] !== undefined) {
      setForm((p) => ({ ...p, price: vipPrices[count] }));
    }
  }, [form.userCount, vipPrices]);

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
        // 서버 예시와 동일한 로컬 ISO 형식(타임존 미포함)
        meetingDate: `${form.meetingDate}T${form.pickupTime}:00`,
        pickupTime: form.pickupTime,
        pickupAddress: form.pickupAddress.trim(),
        returnAddress: form.returnAddress.trim(),
        requests: form.requests?.trim() || undefined,
        price: Number(form.price),
        // 본인 확인 및 필드 충족: 조회된 예약의 이메일/이름/전화번호를 기본 포함
        email: reservation.email || undefined,
        name: reservation.name || undefined,
        phoneNumber: reservation.phoneNumber || undefined,
      } as Record<string, unknown>;

      const updated = await updateMutation.mutateAsync({
        reservationId: reservation.reservationId,
        body,
      });

      // API 응답을 새 스키마로 매핑
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

      onSaved(next as any);
      toast.success("예약이 수정되었습니다.");
      onOpenChange(false);
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string } | undefined;
      let desc = err?.message || "잠시 후 다시 시도해주세요.";
      if (err?.status === 404) desc = "예약을 찾을 수 없습니다.";
      else if (err?.status === 409)
        desc = "현재 상태에서는 수정할 수 없습니다.";
      toast.error("예약 수정에 실패했습니다.", { description: desc });
    } finally {
      setIsSaving(false);
    }
  };

  const FormBody = (
    <div className="space-y-4">
      <div>
        <Label className="mb-1 block">예약명</Label>
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
          <Label className="mb-1 block">미팅 날짜</Label>
          <DatePicker
            value={form.meetingDate}
            onChange={(v) => setForm((prev) => ({ ...prev, meetingDate: v }))}
            minDate={new Date()}
            modal={true}
          />
        </div>
        <div>
          <Label className="mb-1 block">미팅 시간</Label>
          <TimePicker
            value={form.pickupTime}
            onChange={(v) => setForm((prev) => ({ ...prev, pickupTime: v }))}
            modal={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="mb-1 block">인원</Label>
          <Combobox
            value={form.userCount}
            onChange={(v) => setForm((p) => ({ ...p, userCount: v || "" }))}
            options={[
              { value: "", label: "인원을 선택하세요" },
              { value: "2", label: "2인" },
              { value: "3", label: "3인" },
              { value: "4", label: "4인" },
              { value: "5", label: "5인" },
              { value: "6", label: "6인" },
              { value: "7", label: "7인" },
              { value: "8", label: "8인" },
              { value: "9+", label: "9인 이상 (별도 문의)" },
            ]}
            widthClassName="w-full"
            buttonClassName="h-9 text-sm justify-between"
            disabled
            modal={true}
          />
        </div>
        <div>
          <Label className="mb-1 block">총 금액(₩)</Label>
          <Input type="number" min={0} value={form.price} disabled readOnly />
        </div>
      </div>
      <div>
        <Label className="mb-1 block">픽업 주소</Label>
        <Textarea
          value={form.pickupAddress}
          onChange={(e) =>
            setForm((p) => ({ ...p, pickupAddress: e.target.value }))
          }
        />
      </div>
      <div>
        <Label className="mb-1 block">복귀 주소</Label>
        <Textarea
          value={form.returnAddress}
          onChange={(e) =>
            setForm((p) => ({ ...p, returnAddress: e.target.value }))
          }
        />
      </div>
      <div>
        <Label className="mb-1 block">요청사항</Label>
        <Textarea
          value={form.requests}
          onChange={(e) => setForm((p) => ({ ...p, requests: e.target.value }))}
        />
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="max-h-[80vh] max-w-lg overflow-y-auto border-none bg-white"
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => {
            // Dialog가 열릴 때 자동 포커스를 방지하여 aria-hidden 경고 해결
            e.preventDefault();
          }}
          onInteractOutside={(e) => {
            // Popover가 열려있는지 확인
            const hasOpenPopover = document.querySelector(
              "[data-radix-popper-content-wrapper]",
            );
            if (hasOpenPopover) {
              // Popover가 열려있으면 Dialog는 닫히지 않도록 막음
              e.preventDefault();
            }
          }}
          onCloseAutoFocus={(e) => {
            // Dialog가 닫힐 때 포커스를 트리거로 돌리지 않고 방지
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>예약 정보 수정</DialogTitle>
          </DialogHeader>
          <div className="px-1 pb-4">
            <p className="mb-3 text-sm text-gray-500">
              승인 대기 상태에서만 수정할 수 있습니다.
            </p>
            {FormBody}
          </div>
          <div className="flex justify-end gap-2 px-1 py-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              취소
            </Button>
            <Button onClick={handleSave} disabled={!isValid || isSaving}>
              {isSaving ? "저장 중..." : "저장"}
            </Button>
          </div>
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
          // Popover가 열려있는지 확인
          const hasOpenPopover = document.querySelector(
            "[data-radix-popper-content-wrapper]",
          );
          if (hasOpenPopover) {
            // Popover가 열려있으면 Drawer는 닫히지 않도록 막음
            e.preventDefault();
          }
        }}
      >
        <DrawerHeader className="flex-shrink-0 text-left">
          <DrawerTitle>예약 정보 수정</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-auto px-4 pb-4">
          <p className="mb-3 text-sm text-gray-500">
            승인 대기(PENDING) 상태에서만 수정할 수 있습니다.
          </p>
          {FormBody}
        </div>

        <div className="flex flex-shrink-0 justify-end gap-2 px-4 py-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            취소
          </Button>
          <Button onClick={handleSave} disabled={!isValid || isSaving}>
            {isSaving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
