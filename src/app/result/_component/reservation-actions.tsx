import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ReservationListDrawer, {
  ReservationListItem,
} from "@/app/result/_component/reservation-list-drawer";
import { useAuth } from "@/hooks/use-auth";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Reservation {
  reservationId: string | number;
  reservationName: string;
  price: number;
  status: string;
  isCancelable: boolean;
  createdAt: string;
}

interface ReservationActionsProps {
  currentReservation: Reservation;
  reservations: ReservationListItem[];
  isLoading: boolean;
  showCancelDialog: boolean;
  setShowCancelDialog: (show: boolean) => void;
  handleCancelConfirm: () => void;
  canEdit?: boolean;
  onEditClick?: () => void;
}

export default function ReservationActions({
  currentReservation,
  reservations,
  isLoading,
  showCancelDialog,
  setShowCancelDialog,
  handleCancelConfirm,
  canEdit = false,
  onEditClick,
}: ReservationActionsProps) {
  const { isAuthenticated, hasHydrated } = useAuth();
  const router = useRouter();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<"cancel" | "edit" | null>(
    null,
  );

  const canInteract = useMemo(
    () => hasHydrated && isAuthenticated,
    [hasHydrated, isAuthenticated],
  );

  const handleAuthGuard = (action: "cancel" | "edit") => {
    if (!canInteract) {
      setPendingAction(action);
      setShowAuthDialog(true);
      return false;
    }
    return true;
  };

  const handleAuthConfirm = () => {
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : "",
    );
    if (pendingAction) {
      params.set("action", pendingAction);
    }
    if (!params.get("reservationId") && currentReservation?.reservationId) {
      params.set("reservationId", String(currentReservation.reservationId));
    }
    const returnUrl = `${typeof window !== "undefined" ? window.location.pathname : "/result"}?${params.toString()}`;
    router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
  };

  return (
    <div className="mt-8 grid gap-3 md:grid-cols-2 md:justify-center md:gap-4">
      {/* 취소 버튼 */}
      {currentReservation.isCancelable && (
        <>
          <Button
            onClick={() => {
              if (!handleAuthGuard("cancel")) return;
              setShowCancelDialog(true);
            }}
            variant="destructive"
            disabled={isLoading}
            className="flex h-12 items-center justify-center gap-2"
          >
            <CancelIcon />
            {isLoading ? "취소 처리 중..." : "예약 취소"}
          </Button>

          <CancelConfirmDialog
            open={showCancelDialog}
            onOpenChange={setShowCancelDialog}
            onConfirm={handleCancelConfirm}
          />
        </>
      )}

      {/* 수정 버튼 */}
      {canEdit && (
        <Button
          variant="default"
          onClick={() => {
            if (!handleAuthGuard("edit")) return;
            onEditClick?.();
          }}
          className="flex h-12 items-center justify-center gap-2"
        >
          <EditIcon />
          예약 수정
        </Button>
      )}

      {/* 나의 예약 보기 */}
      <ReservationListDrawer reservations={reservations}>
        <Button
          variant="outline"
          className="flex h-12 items-center justify-center gap-2"
        >
          <ListIcon />
          나의 모든 예약 보기 ({reservations.length})
        </Button>
      </ReservationListDrawer>

      {/* 인증 유도 다이얼로그 */}
      <AuthRequiredDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onConfirm={handleAuthConfirm}
      />
    </div>
  );
}

// 취소 확인 다이얼로그
function CancelConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <WarningIcon />
            예약을 취소하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2">
            정말로 예약을 취소하시겠습니까?
            <br />
            <strong className="text-red-600">
              취소된 예약은 복구할 수 없습니다.
            </strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>아니오</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
          >
            예약 취소하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// 인증 필요 다이얼로그
function AuthRequiredDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-white">
        <AlertDialogHeader>
          <AlertDialogTitle>전화번호 인증이 필요합니다</AlertDialogTitle>
          <AlertDialogDescription>
            해당 작업을 진행하려면 로그인(전화번호 인증)이 필요합니다.
            진행하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>아니오</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            예, 진행할게요
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// SVG 아이콘들
function CancelIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536M4 13.5V20h6.5l8.5-8.5a2.5 2.5 0 10-3.536-3.536L7 16.5"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      className="h-5 w-5 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  );
}
