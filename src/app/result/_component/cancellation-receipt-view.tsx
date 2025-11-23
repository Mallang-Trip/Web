"use client";

import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";

interface CancellationReceipt {
  issuedDate: string;
  cancellationInfo: {
    reservationNumber: number;
    productName: string;
    tourDate: string;
    canceledDate: string;
    totalPaymentAmount: number;
    paymentCurrency: string;
  };
  refundInfo: {
    refundAmount: number;
    refundCurrency: string;
    refundProcessDate: string;
    refundPercentage: number;
    refundPolicyMessage: string;
  };
}

interface CancellationReceiptViewProps {
  data: CancellationReceipt | { error: true; message: string };
}

export default function CancellationReceiptView({
  data,
}: CancellationReceiptViewProps) {
  const { t, lang } = useTranslation();

  if ((data as { error?: boolean }).error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
        {t.result.cancellationReceipt.errorLoading}{" "}
        {(data as { message?: string }).message}
      </div>
    );
  }

  const receipt = data as CancellationReceipt;
  const issued = new Date(receipt.issuedDate);
  const tourDate = new Date(receipt.cancellationInfo.tourDate);
  const canceledDate = new Date(receipt.cancellationInfo.canceledDate);
  const refundProcessDate = new Date(receipt.refundInfo.refundProcessDate);

  const locale = lang === "en" ? "en-US" : lang === "zh" ? "zh-CN" : "ko-KR";

  const formatDate = (date: Date) =>
    date.toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  const formatDateKo = (date: Date) =>
    date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // 결제 당시 사용한 통화를 기준으로 금액 표시
  const paymentCurrency = receipt.cancellationInfo.paymentCurrency || "KRW";
  const isKRW = paymentCurrency === "KRW";

  const currency = (n: number) => {
    if (isKRW) {
      return formatPrice(Number(n || 0), "ko");
    } else {
      return formatPrice(Number(n || 0), "en");
    }
  };

  return (
    <div className="space-y-6">
      {/* 문서 정보 */}
      <DocumentInfo
        issued={issued}
        formatDate={formatDate}
        formatDateKo={formatDateKo}
        reservationNumber={receipt.cancellationInfo.reservationNumber}
        t={t}
      />

      {/* 공급자 정보 */}
      <SupplierInfo t={t} />

      {/* 취소 내역 */}
      <CancellationInfo
        cancellationInfo={receipt.cancellationInfo}
        formatDate={formatDate}
        formatDateKo={formatDateKo}
        tourDate={tourDate}
        canceledDate={canceledDate}
        currency={currency}
        t={t}
      />

      {/* 환불 처리 안내 */}
      <RefundInfo
        refundInfo={receipt.refundInfo}
        formatDateKo={formatDateKo}
        refundProcessDate={refundProcessDate}
        currency={currency}
        t={t}
      />

      {/* 비고 */}
      <Remarks issued={issued} formatDateKo={formatDateKo} t={t} />
    </div>
  );
}

// 문서 정보 컴포넌트
function DocumentInfo({
  issued,
  formatDate,
  formatDateKo,
  reservationNumber,
  t,
}: {
  issued: Date;
  formatDate: (date: Date) => string;
  formatDateKo: (date: Date) => string;
  reservationNumber: number;
  t: any;
}) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-gray-200">
        <div className="bg-gray-100 p-3 font-semibold text-gray-700">
          {t.result.cancellationReceipt.documentNo}
        </div>
        <div className="col-span-2 min-w-0 p-3 break-words whitespace-pre-wrap">
          CANCEL-{reservationNumber}-
          {formatDate(issued).replaceAll(".", "").replace(/\s/g, "")}
        </div>
        <div className="bg-gray-100 p-3 font-semibold text-gray-700">
          {t.result.cancellationReceipt.issueDate}
        </div>
        <div className="col-span-2 min-w-0 p-3 break-words whitespace-pre-wrap">
          {formatDateKo(issued)}
        </div>
      </div>
    </div>
  );
}

// 공급자 정보 컴포넌트
function SupplierInfo({ t }: { t: any }) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">
        {t.result.cancellationReceipt.supplier}
      </h3>
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-md border border-gray-200 text-sm">
        <InfoCell
          label={t.result.cancellationReceipt.businessName}
          value={t.result.cancellationReceipt.supplierInfo.businessName}
        />
        <InfoCell
          label={t.result.cancellationReceipt.businessNumber}
          value={t.result.cancellationReceipt.supplierInfo.businessNumber}
        />
        <InfoCell
          label={t.result.cancellationReceipt.representative}
          value={t.result.cancellationReceipt.supplierInfo.representative}
        />
        <InfoCell
          label={t.result.cancellationReceipt.address}
          value={t.result.cancellationReceipt.supplierInfo.address}
        />
        <InfoCell
          label={t.result.cancellationReceipt.contact}
          value={t.result.cancellationReceipt.supplierInfo.contact}
        />
        <InfoCell
          label={t.result.cancellationReceipt.email}
          value={t.result.cancellationReceipt.supplierInfo.email}
        />
      </div>
    </div>
  );
}

// 취소 내역 컴포넌트
function CancellationInfo({
  cancellationInfo,
  formatDate,
  formatDateKo,
  tourDate,
  canceledDate,
  currency,
  t,
}: {
  cancellationInfo: CancellationReceipt["cancellationInfo"];
  formatDate: (date: Date) => string;
  formatDateKo: (date: Date) => string;
  tourDate: Date;
  canceledDate: Date;
  currency: (n: number) => string;
  t: any;
}) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">
        {t.result.cancellationReceipt.cancellationDetails}
      </h3>
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3">
                {t.result.cancellationReceipt.reservationNumber}
              </th>
              <th className="p-3">{t.result.cancellationReceipt.productName}</th>
              <th className="p-3">{t.result.cancellationReceipt.tourDate}</th>
              <th className="p-3">
                {t.result.cancellationReceipt.canceledDate}
              </th>
              <th className="p-3">
                {t.result.cancellationReceipt.totalPaymentAmount}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 break-words whitespace-pre-wrap">
                {cancellationInfo.reservationNumber}
              </td>
              <td className="p-3 break-words whitespace-pre-wrap">
                {cancellationInfo.productName}
              </td>
              <td className="p-3 break-words whitespace-pre-wrap">
                {formatDateKo(tourDate)}
              </td>
              <td className="p-3 break-words whitespace-pre-wrap">
                {formatDateKo(canceledDate)}
              </td>
              <td className="p-3 break-words whitespace-pre-wrap">
                {currency(cancellationInfo.totalPaymentAmount)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 환불 처리 안내 컴포넌트
function RefundInfo({
  refundInfo,
  formatDateKo,
  refundProcessDate,
  currency,
  t,
}: {
  refundInfo: CancellationReceipt["refundInfo"];
  formatDateKo: (date: Date) => string;
  refundProcessDate: Date;
  currency: (n: number) => string;
  t: any;
}) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">
        {t.result.cancellationReceipt.refundInfo}
      </h3>
      <div className="space-y-4 rounded-md border border-gray-200 p-4 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-500">
              {t.result.cancellationReceipt.refundAmount}
            </div>
            <div className="text-lg font-semibold">
              {currency(refundInfo.refundAmount)}
            </div>
          </div>
          <div>
            <div className="text-gray-500">
              {t.result.cancellationReceipt.refundPercentage}
            </div>
            <div className="text-lg font-semibold">
              {refundInfo.refundPercentage}%
            </div>
          </div>
        </div>
        <div>
          <div className="text-gray-500">
            {t.result.cancellationReceipt.refundProcessDate}
          </div>
          <div className="font-medium">{formatDateKo(refundProcessDate)}</div>
        </div>
        <div className="rounded-md bg-gray-50 p-3">
          <div className="mb-1 font-medium text-gray-700">
            {t.result.cancellationReceipt.refundPolicy}
          </div>
          <div className="whitespace-pre-line text-gray-600">
            {refundInfo.refundPolicyMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

// 비고 컴포넌트
function Remarks({
  issued,
  formatDateKo,
  t,
}: {
  issued: Date;
  formatDateKo: (date: Date) => string;
  t: any;
}) {
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <div className="pt-2">{t.result.cancellationReceipt.confirmation}</div>
      <div>{formatDateKo(issued)}</div>
      <div className="font-semibold">
        {t.result.cancellationReceipt.companyName}
      </div>
    </div>
  );
}

// 헬퍼 컴포넌트
function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div className="bg-gray-100 p-3 font-semibold text-gray-700">{label}</div>
      <div className="col-span-1 min-w-0 bg-white p-3 break-words whitespace-pre-wrap">
        {value}
      </div>
    </>
  );
}
