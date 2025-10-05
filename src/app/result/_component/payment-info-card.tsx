import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReservationAPI } from "@/utils/api";
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

export default function PaymentInfoCard({
  reservation,
  isAuthenticated,
}: {
  reservation: {
    reservationId: number | string;
    paymentInfo?: ReservationPaymentInfo | null;
  };
  isAuthenticated: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statement, setStatement] = useState<
    | {
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
        };
      }
    | { error: true; message: string }
    | null
  >(null);
  const { isAuthenticated: authState } = useAuthStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const paymentExists = !!reservation.paymentInfo;
  const canShowPayment = paymentExists && (isAuthenticated || authState);

  const handleIssueStatement = async () => {
    try {
      setIsLoading(true);
      const res = await ReservationAPI.getById<any>(
        `${reservation.reservationId}/transaction-statement`,
      );
      // apiGet 래퍼는 ApiEnvelope<T>를 반환하므로, 거래명세서 본문은 res.data에 존재
      setStatement(res?.data ?? null);
      setIsOpen(true);
    } catch (e) {
      setStatement({
        error: true,
        message: (e as any)?.message || "발급 실패",
      });
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!canShowPayment) return null;

  const info = reservation.paymentInfo!;
  const statusText = (() => {
    const s = String(info.status || "").toUpperCase();
    if (s.includes("COMPLETED")) return "결제 완료";
    if (s.includes("REFUNDED")) return "환불 완료";
    return "승인 대기";
  })();
  const isCompleted = String(info.status || "")
    .toUpperCase()
    .includes("COMPLETED");
  const isRefunded = String(info.status || "")
    .toUpperCase()
    .includes("REFUNDED");
  const formatDateTime = (iso?: string | null) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";
    const date = d.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
    const time = d.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${time}`;
  };

  return (
    <>
      <Card className="mt-8">
        <CardContent>
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between font-semibold">
              <span>결제 정보</span>
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
            </summary>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
              <div className="grid grid-cols-[120px_1fr] gap-2">
                {/* <span className="text-gray-500">결제 번호</span>
                <span className="font-medium">{info.paymentNumber}</span> */}
                <span className="text-gray-500">결제 상태</span>
                <span className="font-medium">{statusText}</span>
                {isCompleted && (
                  <>
                    <span className="text-gray-500">승인 일시</span>
                    <span className="font-medium">
                      {formatDateTime(info.approvedAt)}
                    </span>
                  </>
                )}
                {isRefunded && (
                  <>
                    <span className="text-gray-500">환불 일시</span>
                    <span className="font-medium">
                      {formatDateTime(info.canceledAt)}
                    </span>
                  </>
                )}
                <span className="text-gray-500">결제 수단</span>
                <span className="font-medium">{info.paymentMethod}</span>
                <span className="text-gray-500">결제 금액</span>
                <span className="font-medium">
                  ₩{info.amount.toLocaleString()}
                </span>
                {info.cardInfo && (
                  <>
                    <span className="text-gray-500">카드</span>
                    <span className="font-medium">
                      {info.cardInfo.cardName} ({info.cardInfo.cardNumber})
                    </span>
                  </>
                )}
              </div>

              <div className="pt-2">
                <Button onClick={handleIssueStatement} disabled={isLoading}>
                  {isLoading ? "발급 중..." : "거래명세서 발급"}
                </Button>
              </div>
            </div>
          </details>
        </CardContent>
      </Card>
      {isOpen &&
        statement &&
        (isDesktop ? (
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
        ) : (
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
        ))}
      <Card className="mt-8">
        <CardContent>
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between font-semibold">
              <span>현장 결제 안내</span>
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

function TransactionStatementView({
  data,
}: {
  data:
    | {
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
        };
      }
    | { error: true; message: string };
}) {
  if ((data as any)?.error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
        거래명세서를 불러오지 못했습니다. {(data as any)?.message}
      </div>
    );
  }

  const d = data as any;
  const issued = new Date(d.issuedDate);
  const paymentDate = new Date(d.transactionDetail.paymentDate);
  const formatDate = (date: Date) =>
    date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  const formatDateKo = (date: Date) =>
    date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const formatTimeKo = (date: Date) =>
    date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  const currency = (n: number) => `₩${Number(n || 0).toLocaleString()}`;

  const quantity = Number(d.transactionDetail.quantity || 0);
  const unitPrice = Number(d.transactionDetail.pricePerPerson || 0);
  const totalAmount = quantity * unitPrice;
  const supplyAmount = Math.round(totalAmount / 1.1);
  const taxAmount = totalAmount - supplyAmount;

  return (
    <div className="space-y-6">
      <div>
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-none border">
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            문서번호 (Invoice No.)
          </div>
          <div className="col-span-2 min-w-0 p-3 break-words whitespace-pre-wrap">
            MALLANGTRIP-
            {formatDate(issued).replaceAll(".", "").replace(/\s/g, "")}-
            {String(issued.getHours()).padStart(2, "0")}
            {String(issued.getMinutes()).padStart(2, "0")}
            {String(issued.getSeconds()).padStart(2, "0")}
          </div>
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            작성일자 (Date)
          </div>
          <div className="col-span-2 min-w-0 p-3 break-words whitespace-pre-wrap">
            {formatDateKo(issued)}
          </div>
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            수신 (To)
          </div>
          <div className="col-span-2 min-w-0 p-3 break-words whitespace-pre-wrap">
            {d.customer?.name || "고객"} 귀하
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">공급자 (Supplier)</h3>
        <div className="grid grid-cols-4 gap-px overflow-hidden rounded-none border text-sm">
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            상호
          </div>
          <div className="col-span-1 min-w-0 bg-white p-3 break-words whitespace-pre-wrap">
            말랑트립
          </div>
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            사업자등록번호
          </div>
          <div className="col-span-1 min-w-0 bg-white p-3 break-words whitespace-pre-wrap">
            399-51-00784
          </div>
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            대표
          </div>
          <div className="col-span-1 min-w-0 bg-white p-3 break-words whitespace-pre-wrap">
            김제윤
          </div>
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            주소
          </div>
          <div className="col-span-1 min-w-0 bg-white p-3 break-words whitespace-pre-wrap">
            경기도 안양시 시민대로327번길 11-41, 310호
          </div>
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            연락처
          </div>
          <div className="col-span-1 min-w-0 bg-white p-3 break-words whitespace-pre-wrap">
            0507-1344-4159 (+82-507-1344-4159)
          </div>
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            이메일
          </div>
          <div className="col-span-1 min-w-0 bg-white p-3 break-words whitespace-pre-wrap">
            mallangtrip@mallangtrip.com
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">공급받는 자 (Customer)</h3>
        <div className="grid grid-cols-4 gap-px overflow-hidden rounded-none border text-sm">
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            예약자명
          </div>
          <div className="col-span-1 min-w-0 bg-white p-3 break-words whitespace-pre-wrap">
            {d.customer?.name}
          </div>
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            연락처
          </div>
          <div className="col-span-1 min-w-0 bg-white p-3 break-words whitespace-pre-wrap">
            {d.customer?.phoneNumber}
          </div>
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            이메일
          </div>
          <div className="col-span-1 bg-white p-3 break-all">
            {d.customer?.email}
          </div>
          <div className="bg-gray-100 p-3 font-semibold text-gray-700">
            탑승 인원
          </div>
          <div className="col-span-1 bg-white p-3">
            {Number(d.customer?.passengerCount || 0)}인
          </div>
        </div>
      </div>

      <div className="text-sm font-semibold">
        합계 금액 (Total Amount): {currency(totalAmount)}
      </div>

      <div>
        <h3 className="mb-2 font-semibold">
          거래 상세 내역 (Transaction Details)
        </h3>
        <div className="overflow-x-auto rounded-none border">
          <table className="w-full table-fixed text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3">거래일자</th>
                <th className="p-3">품명</th>
                <th className="p-3">규격 (투어일자)</th>
                <th className="p-3">수량</th>
                <th className="p-3">인당 가격</th>
                <th className="p-3">공급가액</th>
                <th className="p-3">세액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 break-words whitespace-pre-wrap">
                  {formatDate(paymentDate)}
                </td>
                <td className="p-3 break-words whitespace-pre-wrap">
                  {d.transactionDetail.itemName}
                </td>
                <td className="p-3 break-words whitespace-pre-wrap">
                  {formatDate(paymentDate)}
                </td>
                <td className="p-3 break-words whitespace-pre-wrap">
                  {quantity}
                </td>
                <td className="p-3 break-words whitespace-pre-wrap">
                  {currency(unitPrice)}
                </td>
                <td className="p-3 break-words whitespace-pre-wrap">
                  {currency(supplyAmount)}
                </td>
                <td className="p-3 break-words whitespace-pre-wrap">
                  {currency(taxAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-x-auto rounded-none border">
        <table className="w-full table-fixed text-left text-sm">
          <tbody>
            <tr className="bg-gray-50 text-gray-600">
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3">합계</td>
              <td className="p-3">{quantity}</td>
              <td className="p-3"></td>
              <td className="p-3">{currency(supplyAmount)}</td>
              <td className="p-3">{currency(taxAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">비고 (Remarks)</h3>
        <div className="space-y-3 text-sm leading-relaxed">
          <div>
            <div className="mb-1 font-medium">1. 포함 내역 (Inclusions):</div>
            <ul className="list-disc space-y-1 pl-5">
              <li>프라이빗 전용 차량 및 전문 드라이버 (Door-to-Door 서비스)</li>
              <li>유류비, 주차비, 통행료 일체</li>
              <li>전문 통역 안내 서비스</li>
              <li>
                말랑트립이 큐레이션 해드리는 양조장 2곳 투어 및 체험비 (시음
                포함)
              </li>
              <li>차량 내 생수 제공</li>
            </ul>
          </div>
          <div>
            <div className="mb-1 font-medium">2. 불포함 내역 (Exclusions):</div>
            <ul className="list-disc space-y-1 pl-5">
              <li>모든 식사 비용 (점심, 저녁 등)</li>
              <li>개인 경비 및 여행자 보험</li>
            </ul>
          </div>
          <div>
            <div className="mb-1 font-medium">
              3. 결제 정보 (Payment Information):
            </div>
            <ul className="list-disc space-y-1 pl-5">
              <li>결제수단: 신용카드</li>
              <li>
                결제일시: {formatDateKo(paymentDate)}{" "}
                {formatTimeKo(paymentDate)}
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-1 font-medium">
              4. 취소 및 환불 규정 (Cancellation & Refund Policy):
            </div>
            <ul className="list-disc space-y-1 pl-5">
              <li>투어일 기준 4일 전까지 취소 시: 전액 환불</li>
              <li>투어일 기준 3일 전부터 취소 시: 환불 불가</li>
            </ul>
          </div>
          <div className="pt-2">위와 같이 거래하였음을 확인합니다.</div>
          <div>{formatDateKo(issued)}</div>
          <div className="font-semibold">말랑트립</div>
        </div>
      </div>
    </div>
  );
}
