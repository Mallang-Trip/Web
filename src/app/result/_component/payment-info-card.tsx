import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
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
import TransactionStatementView from "./transaction-statement-view";
import {
  useTransactionStatement,
  StatementData,
} from "./hooks/use-transaction-statement";
import { formatDateTime } from "@/utils/date";

type ReservationPaymentInfo = {
  paymentNumber: string;
  transactionId: string | null;
  amount: number;
  status: string;
  paymentMethod: string;
  provider: string;
  approvalNumber: string;
  cardInfo: {
    cardNumber: string;
    cardName: string;
    installment: number;
  } | null;
  requestedAt: string;
  approvedAt: string | null;
  canceledAt: string | null;
};

interface PaymentInfoCardProps {
  reservation: {
    reservationId: number | string;
    paymentInfo?: ReservationPaymentInfo | null;
  };
  isAuthenticated: boolean;
}

export default function PaymentInfoCard({
  reservation,
  isAuthenticated,
}: PaymentInfoCardProps) {
  const { isAuthenticated: authState } = useAuthStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { isOpen, setIsOpen, isLoading, statement, fetchStatement } =
    useTransactionStatement(reservation.reservationId);

  const paymentExists = !!reservation.paymentInfo;
  const canShowPayment = paymentExists && (isAuthenticated || authState);

  if (!canShowPayment) return null;

  const info = reservation.paymentInfo!;

  return (
    <>
      <Card className="mt-8">
        <CardContent>
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between font-semibold">
              <span>결제 정보</span>
              <ChevronIcon />
            </summary>
            <PaymentDetails info={info} />
            <div className="pt-2">
              <Button onClick={fetchStatement} disabled={isLoading}>
                {isLoading ? "발급 중..." : "거래명세서 발급"}
              </Button>
            </div>
          </details>
        </CardContent>
      </Card>

      {/* 거래명세서 모달 */}
      {isOpen && statement && (
        <StatementModal
          isDesktop={isDesktop}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          statement={statement}
        />
      )}

      {/* 현장 결제 안내 */}
      <Card className="mt-8">
        <CardContent>
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between font-semibold">
              <span>현장 결제 안내</span>
              <ChevronIcon />
            </summary>
            <div className="mt-4 text-sm leading-relaxed text-gray-600">
              기본 투어 요금 외 픽업/드랍 추가 등으로 발생하는 부가 비용은 예약
              확정 전 말랑트립이 이메일과 전화번호를 통해 따로 안내해드립니다.
            </div>
          </details>
        </CardContent>
      </Card>
    </>
  );
}

// 결제 상세 정보
function PaymentDetails({ info }: { info: ReservationPaymentInfo }) {
  const statusText = getPaymentStatusText(info.status);
  const isCompleted = info.status.toUpperCase().includes("COMPLETED");
  const isRefunded = info.status.toUpperCase().includes("REFUNDED");

  return (
    <div className="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
      <div className="grid grid-cols-[120px_1fr] gap-2">
        <InfoRow label="결제 상태" value={statusText} />

        {isCompleted && (
          <InfoRow
            label="승인 일시"
            value={formatDateTime(info.approvedAt || "")}
          />
        )}

        {isRefunded && (
          <InfoRow
            label="환불 일시"
            value={formatDateTime(info.canceledAt || "")}
          />
        )}

        <InfoRow label="결제 수단" value={info.paymentMethod} />
        <InfoRow label="결제 금액" value={`₩${info.amount.toLocaleString()}`} />

        {info.cardInfo && (
          <InfoRow
            label="카드"
            value={`${info.cardInfo.cardName} (${info.cardInfo.cardNumber})`}
          />
        )}
      </div>
    </div>
  );
}

// 정보 행
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </>
  );
}

// 거래명세서 모달
function StatementModal({
  isDesktop,
  isOpen,
  setIsOpen,
  statement,
}: {
  isDesktop: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  statement: Exclude<StatementData, null>;
}) {
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-lg border-none bg-white">
          <DialogHeader>
            <DialogTitle>거래명세서 (Transaction Statement)</DialogTitle>
          </DialogHeader>
          <div className="flex-1 space-y-6 overflow-auto text-sm text-gray-800">
            <TransactionStatementView data={statement} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="flex max-h-[90vh] flex-col rounded-t-none border-none bg-white">
        <DrawerHeader className="flex-shrink-0 text-left">
          <DrawerTitle>거래명세서 (Transaction Statement)</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-auto px-4 pb-6">
          <TransactionStatementView data={statement} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// 헬퍼 함수
function getPaymentStatusText(status: string): string {
  const s = status.toUpperCase();
  if (s.includes("COMPLETED")) return "결제 완료";
  if (s.includes("REFUNDED")) return "환불 완료";
  return "승인 대기";
}

// 아이콘
function ChevronIcon() {
  return (
    <svg
      className="h-5 w-5 transition-transform group-open:rotate-180"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
