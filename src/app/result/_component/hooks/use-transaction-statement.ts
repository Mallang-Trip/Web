import { useState } from "react";
import { ReservationAPI } from "@/utils/api";

interface TransactionStatement {
  issuedDate: string;
  customer: {
    name: string;
    phoneNumber: string;
    email: string;
    passengerCount: number;
  };
  transactionDetail: {
    paymentNumber: string;
    paymentDate: string;
    itemName: string;
    quantity: number;
    pricePerPerson: number;
    currency: string; // ISO 4217: KRW, USD, EUR, JPY 등
  };
}

export type StatementData =
  | TransactionStatement
  | { error: true; message: string }
  | null;

export function useTransactionStatement(reservationId: number | string) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statement, setStatement] = useState<StatementData>(null);

  const fetchStatement = async () => {
    try {
      setIsLoading(true);
      const res = await ReservationAPI.getById<TransactionStatement>(
        `${reservationId}/transaction-statement`,
      );
      setStatement(res?.data ?? null);
      setIsOpen(true);
    } catch (e) {
      setStatement({
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
    statement,
    fetchStatement,
  };
}
