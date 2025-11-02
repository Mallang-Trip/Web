import { useState } from "react";
import { ReservationAPI } from "@/utils/api";

interface CancellationReceipt {
  issuedDate: string;
  cancellationInfo: {
    reservationNumber: number;
    productName: string;
    tourDate: string;
    canceledDate: string;
    totalPaymentAmount: number;
    paymentCurrency: string; // ISO 4217: KRW, USD, EUR, JPY 등
  };
  refundInfo: {
    refundAmount: number;
    refundCurrency: string;
    refundProcessDate: string;
    refundPercentage: number; // 0 또는 100
    refundPolicyMessage: string;
  };
}

export type CancellationReceiptData =
  | CancellationReceipt
  | { error: true; message: string }
  | null;

export function useCancellationReceipt(reservationId: number | string) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [receipt, setReceipt] = useState<CancellationReceiptData>(null);

  const fetchReceipt = async () => {
    try {
      setIsLoading(true);
      const res = await ReservationAPI.getById<CancellationReceipt>(
        `${reservationId}/cancellation-receipt`,
      );
      setReceipt(res?.data ?? null);
      setIsOpen(true);
    } catch (e) {
      setReceipt({
        error: true,
        message: (e as { message?: string })?.message || "발급 실패",
      });
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    isLoading,
    receipt,
    fetchReceipt,
  };
}
