"use client";

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
import CancellationReceiptView from "./cancellation-receipt-view";
import {
  useTransactionStatement,
  StatementData,
} from "./hooks/use-transaction-statement";
import {
  useCancellationReceipt,
  CancellationReceiptData,
} from "./hooks/use-cancellation-receipt";
import { formatDateTime } from "@/utils/date";
import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

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
  const { t, lang } = useTranslation();
  const { isAuthenticated: authState } = useAuthStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { isOpen, setIsOpen, isLoading, statement, fetchStatement } =
    useTransactionStatement(reservation.reservationId);
  const {
    isOpen: isCancelOpen,
    setIsOpen: setCancelOpen,
    isLoading: isCancelLoading,
    receipt,
    fetchReceipt,
  } = useCancellationReceipt(reservation.reservationId);

  const paymentExists = !!reservation.paymentInfo;
  const canShowPayment = paymentExists && (isAuthenticated || authState);

  if (!canShowPayment) return null;

  const info = reservation.paymentInfo!;
  const isRefunded = info.status.toUpperCase().includes("REFUNDED");

  return (
    <>
      <Card className="mt-8">
        <CardContent>
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between font-semibold">
              <span>{t.result.paymentInfo.title}</span>
              <ChevronIcon />
            </summary>
            <PaymentDetails info={info} lang={lang} t={t} />
            <div className="flex gap-2 pt-2">
              <Button onClick={fetchStatement} disabled={isLoading}>
                {isLoading
                  ? t.result.loading.issuing
                  : t.result.paymentInfo.issueStatement}
              </Button>
              {isRefunded && (
                <Button
                  onClick={fetchReceipt}
                  disabled={isCancelLoading}
                  variant="outline"
                >
                  {isCancelLoading
                    ? t.result.loading.issuing
                    : t.result.paymentInfo.issueCancellation}
                </Button>
              )}
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
          t={t}
        />
      )}

      {/* 취소명세서 모달 */}
      {isCancelOpen && receipt && (
        <CancellationModal
          isDesktop={isDesktop}
          isOpen={isCancelOpen}
          setIsOpen={setCancelOpen}
          receipt={receipt}
          t={t}
        />
      )}

      {/* 현장 결제 안내 */}
      <Card className="mt-8">
        <CardContent>
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between font-semibold">
              <span>{t.result.paymentInfo.onsitePaymentTitle}</span>
              <ChevronIcon />
            </summary>
            <div className="mt-4 text-sm leading-relaxed text-gray-600">
              {t.result.paymentInfo.onsitePaymentDesc}
            </div>
          </details>
        </CardContent>
      </Card>
    </>
  );
}

// 결제 상세 정보
function PaymentDetails({
  info,
  lang,
  t,
}: {
  info: ReservationPaymentInfo;
  lang: string;
  t: any;
}) {
  const getPaymentStatusText = (status: string): string => {
    const s = status.toUpperCase();
    if (s.includes("COMPLETED")) return t.result.paymentInfo.statusCompleted;
    if (s.includes("REFUNDED")) return t.result.paymentInfo.statusRefunded;
    return t.result.paymentInfo.statusPending;
  };

  const statusText = getPaymentStatusText(info.status);
  const isCompleted = info.status.toUpperCase().includes("COMPLETED");
  const isRefunded = info.status.toUpperCase().includes("REFUNDED");

  return (
    <div className="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
      <div className="grid grid-cols-[120px_1fr] gap-2">
        <InfoRow label={t.result.paymentInfo.status} value={statusText} />

        {isCompleted && (
          <InfoRow
            label={t.result.paymentInfo.approvalDate}
            value={formatDateTime(info.approvedAt || "")}
          />
        )}

        {isRefunded && (
          <InfoRow
            label={t.result.paymentInfo.refundDate}
            value={formatDateTime(info.canceledAt || "")}
          />
        )}

        <InfoRow
          label={t.result.paymentInfo.paymentMethod}
          value={lang === "ko" ? info.paymentMethod : "Credit Card"}
        />
        <InfoRow
          label={t.result.paymentInfo.paymentAmount}
          value={
            lang === "ko"
              ? `₩${info.amount.toLocaleString()}`
              : `${formatPrice(info.amount, "en")}`
          }
        />

        {info.cardInfo && (
          <InfoRow
            label={t.result.paymentInfo.card}
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
  t,
}: {
  isDesktop: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  statement: Exclude<StatementData, null>;
  t: any;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `거래명세서_${new Date().toISOString().split("T")[0]}`,
  });

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex max-h-[85vh] flex-col rounded-lg border-none bg-white p-0">
          <DialogHeader className="p-6">
            <DialogTitle>{t.result.paymentInfo.statementTitle}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <div
              ref={contentRef}
              className="space-y-6 p-6 text-sm text-gray-800"
            >
              <TransactionStatementView data={statement} />
            </div>
          </div>
          <div className="flex-shrink-0 px-6 pb-6">
            <Button onClick={handlePrint} className="w-full">
              {t.result.paymentInfo.downloadPdf}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="flex max-h-[90vh] flex-col rounded-t-none border-none bg-white">
        <DrawerHeader className="flex-shrink-0 text-left">
          <DrawerTitle>{t.result.paymentInfo.statementTitle}</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-auto">
          <div ref={contentRef} className="px-4 py-6">
            <TransactionStatementView data={statement} />
          </div>
        </div>
        <div className="flex-shrink-0 px-4 pt-4 pb-6">
          <Button onClick={handlePrint} className="w-full">
            {t.result.paymentInfo.downloadPdf}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// 취소명세서 모달
function CancellationModal({
  isDesktop,
  isOpen,
  setIsOpen,
  receipt,
  t,
}: {
  isDesktop: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  receipt: Exclude<CancellationReceiptData, null>;
  t: any;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `취소명세서_${new Date().toISOString().split("T")[0]}`,
  });

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex max-h-[85vh] flex-col rounded-lg border-none bg-white p-0">
          <DialogHeader className="p-6">
            <DialogTitle>{t.result.paymentInfo.cancellationTitle}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <div ref={contentRef} className="p-6 text-sm text-gray-800">
              <CancellationReceiptView data={receipt} />
            </div>
          </div>
          <div className="flex-shrink-0 px-6 pb-6">
            <Button onClick={handlePrint} className="w-full">
              {t.result.paymentInfo.downloadCancellationPdf}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="flex max-h-[90vh] flex-col rounded-t-none border-none bg-white">
        <DrawerHeader className="flex-shrink-0 text-left">
          <DrawerTitle>{t.result.paymentInfo.cancellationTitle}</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-auto">
          <div ref={contentRef} className="px-4 py-6">
            <CancellationReceiptView data={receipt} />
          </div>
        </div>
        <div className="flex-shrink-0 px-4 pt-4 pb-6">
          <Button onClick={handlePrint} className="w-full">
            {t.result.paymentInfo.downloadCancellationPdf}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
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
