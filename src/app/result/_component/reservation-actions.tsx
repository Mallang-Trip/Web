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
import ReservationListDrawer from "@/components/reservation-list-drawer";

interface Reservation {
  reservationId: string;
  tripName: string;
  startTime: string;
  endTime: string;
  price: number;
  tripStatus: string;
  paymentStatus: string;
  canceled: boolean;
  refunded: boolean;
  createdAt: string;
  pickupLocation?: string;
  dropLocation?: string;
  courseDetail?: string;
}

interface ReservationActionsProps {
  currentReservation: Reservation;
  reservations: Reservation[];
  isLoading: boolean;
  showCancelDialog: boolean;
  setShowCancelDialog: (show: boolean) => void;
  handleCancelClick: () => void;
  handleCancelConfirm: () => void;
}

export default function ReservationActions({
  currentReservation,
  reservations,
  isLoading,
  showCancelDialog,
  setShowCancelDialog,
  handleCancelClick,
  handleCancelConfirm,
}: ReservationActionsProps) {
  return (
    <div className="mt-8 grid gap-3 md:grid-cols-2 md:justify-center md:gap-4">
      {/* 취소 버튼 - 이미 취소된 예약은 버튼 숨김 */}
      {!currentReservation.canceled && (
        <>
          <Button
            onClick={handleCancelClick}
            variant="destructive"
            disabled={isLoading}
            className="flex h-12 items-center justify-center gap-2"
          >
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
            {isLoading ? "취소 처리 중..." : "예약 취소"}
          </Button>

          {/* Alert Dialog */}
          <AlertDialog
            open={showCancelDialog}
            onOpenChange={setShowCancelDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
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
                  onClick={handleCancelConfirm}
                  className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
                >
                  예약 취소하기
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      <ReservationListDrawer reservations={reservations}>
        <Button
          variant="outline"
          className="flex h-12 items-center justify-center gap-2"
        >
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
          나의 모든 예약 보기 ({reservations.length})
        </Button>
      </ReservationListDrawer>
    </div>
  );
}
