"use client";

import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";

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
  };
}

interface TransactionStatementViewProps {
  data: TransactionStatement | { error: true; message: string };
}

export default function TransactionStatementView({
  data,
}: TransactionStatementViewProps) {
  const { t, lang } = useTranslation();
  if ((data as { error?: boolean }).error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
        {t.result.transactionStatement.errorLoading}{" "}
        {(data as { message?: string }).message}
      </div>
    );
  }

  const statement = data as TransactionStatement;
  const issued = new Date(statement.issuedDate);
  const paymentDate = new Date(statement.transactionDetail.paymentDate);

  const locale = lang === "en" ? "en-US" : "ko-KR";

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

  const formatTimeKo = (date: Date) =>
    date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });

  const currency = (n: number) =>
    formatPrice(Number(n || 0), lang as "ko" | "en");

  const quantity = Number(statement.transactionDetail.quantity || 0);
  const unitPrice = Number(statement.transactionDetail.pricePerPerson || 0);
  const totalAmount = quantity * unitPrice;
  const supplyAmount = Math.round(totalAmount / 1.1);
  const taxAmount = totalAmount - supplyAmount;

  return (
    <div className="space-y-6">
      {/* 문서 정보 */}
      <DocumentInfo
        issued={issued}
        formatDate={formatDate}
        formatDateKo={formatDateKo}
        customer={statement.customer}
        t={t}
        lang={lang}
      />

      {/* 공급자 정보 */}
      <SupplierInfo t={t} />

      {/* 공급받는 자 정보 */}
      <CustomerInfo customer={statement.customer} t={t} lang={lang} />

      {/* 합계 금액 */}
      <TotalAmount totalAmount={totalAmount} currency={currency} t={t} />

      {/* 거래 상세 내역 */}
      <TransactionDetail
        statement={statement}
        formatDate={formatDate}
        currency={currency}
        quantity={quantity}
        unitPrice={unitPrice}
        supplyAmount={supplyAmount}
        taxAmount={taxAmount}
        t={t}
      />

      {/* 합계 테이블 */}
      <QuantityTable
        quantity={quantity}
        supplyAmount={supplyAmount}
        taxAmount={taxAmount}
        currency={currency}
        t={t}
      />

      {/* 비고 */}
      <Remarks
        issued={issued}
        paymentDate={paymentDate}
        formatDateKo={formatDateKo}
        formatTimeKo={formatTimeKo}
        t={t}
      />
    </div>
  );
}

// 문서 정보 컴포넌트
function DocumentInfo({
  issued,
  formatDate,
  formatDateKo,
  customer,
  t,
  lang,
}: {
  issued: Date;
  formatDate: (date: Date) => string;
  formatDateKo: (date: Date) => string;
  customer: TransactionStatement["customer"];
  t: any;
  lang: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-gray-200">
        <div className="bg-gray-100 p-3 font-semibold text-gray-700">
          {t.result.transactionStatement.invoiceNo}
        </div>
        <div className="col-span-2 min-w-0 p-3 break-words whitespace-pre-wrap">
          MALLANGTRIP-
          {formatDate(issued).replaceAll(".", "").replace(/\s/g, "")}-
          {String(issued.getHours()).padStart(2, "0")}
          {String(issued.getMinutes()).padStart(2, "0")}
          {String(issued.getSeconds()).padStart(2, "0")}
        </div>
        <div className="bg-gray-100 p-3 font-semibold text-gray-700">
          {t.result.transactionStatement.date}
        </div>
        <div className="col-span-2 min-w-0 p-3 break-words whitespace-pre-wrap">
          {formatDateKo(issued)}
        </div>
        <div className="bg-gray-100 p-3 font-semibold text-gray-700">
          {t.result.transactionStatement.to}
        </div>
        <div className="col-span-2 min-w-0 p-3 break-words whitespace-pre-wrap">
          {lang === "en"
            ? `${t.result.transactionStatement.dear} ${customer?.name || "Customer"}`
            : `${customer?.name || "고객"} ${t.result.transactionStatement.dear}`}
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
        {t.result.transactionStatement.supplier}
      </h3>
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-md border border-gray-200 text-sm">
        <InfoCell
          label={t.result.transactionStatement.businessName}
          value={t.result.transactionStatement.supplierInfo.businessName}
        />
        <InfoCell
          label={t.result.transactionStatement.businessNumber}
          value={t.result.transactionStatement.supplierInfo.businessNumber}
        />
        <InfoCell
          label={t.result.transactionStatement.representative}
          value={t.result.transactionStatement.supplierInfo.representative}
        />
        <InfoCell
          label={t.result.transactionStatement.address}
          value={t.result.transactionStatement.supplierInfo.address}
        />
        <InfoCell
          label={t.result.transactionStatement.contact}
          value={t.result.transactionStatement.supplierInfo.contact}
        />
        <InfoCell
          label={t.result.transactionStatement.email}
          value={t.result.transactionStatement.supplierInfo.email}
        />
      </div>
    </div>
  );
}

// 공급받는 자 정보 컴포넌트
function CustomerInfo({
  customer,
  t,
  lang,
}: {
  customer: TransactionStatement["customer"];
  t: any;
  lang: string;
}) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">
        {t.result.transactionStatement.customer}
      </h3>
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-md border border-gray-200 text-sm">
        <InfoCell
          label={t.result.transactionStatement.bookerName}
          value={customer?.name}
        />
        <InfoCell
          label={t.result.transactionStatement.contact}
          value={customer?.phoneNumber}
        />
        <div className="bg-gray-100 p-3 font-semibold text-gray-700">
          {t.result.transactionStatement.email}
        </div>
        <div className="col-span-1 bg-white p-3 break-all">
          {customer?.email}
        </div>
        <InfoCell
          label={t.result.transactionStatement.passengers}
          value={`${Number(customer?.passengerCount || 0)}${lang === "en" ? "" : t.result.transactionStatement.peopleCount}`}
        />
      </div>
    </div>
  );
}

// 합계 금액 컴포넌트
function TotalAmount({
  totalAmount,
  currency,
  t,
}: {
  totalAmount: number;
  currency: (n: number) => string;
  t: any;
}) {
  return (
    <div className="text-right text-lg font-semibold">
      {t.result.transactionStatement.totalAmount}: {currency(totalAmount)}
    </div>
  );
}

// 거래 상세 내역 컴포넌트
function TransactionDetail({
  statement,
  formatDate,
  currency,
  quantity,
  unitPrice,
  supplyAmount,
  taxAmount,
  t,
}: {
  statement: TransactionStatement;
  formatDate: (date: Date) => string;
  currency: (n: number) => string;
  quantity: number;
  unitPrice: number;
  supplyAmount: number;
  taxAmount: number;
  t: any;
}) {
  const paymentDate = new Date(statement.transactionDetail.paymentDate);

  return (
    <div>
      <h3 className="mb-2 font-semibold">
        {t.result.transactionStatement.transactionDetails}
      </h3>
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3">
                {t.result.transactionStatement.transactionDate}
              </th>
              <th className="p-3">{t.result.transactionStatement.itemName}</th>
              <th className="p-3">
                {t.result.transactionStatement.specification}
              </th>
              <th className="p-3">{t.result.transactionStatement.quantity}</th>
              <th className="p-3">
                {t.result.transactionStatement.pricePerPerson}
              </th>
              <th className="p-3">
                {t.result.transactionStatement.supplyAmount}
              </th>
              <th className="p-3">{t.result.transactionStatement.taxAmount}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 break-words whitespace-pre-wrap">
                {formatDate(paymentDate)}
              </td>
              <td className="p-3 break-words whitespace-pre-wrap">
                {statement.transactionDetail.itemName}
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
  );
}

// 수량 테이블 컴포넌트
function QuantityTable({
  quantity,
  supplyAmount,
  taxAmount,
  currency,
  t,
}: {
  quantity: number;
  supplyAmount: number;
  taxAmount: number;
  currency: (n: number) => string;
  t: any;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="w-full table-fixed text-left text-sm">
        <tbody>
          <tr className="bg-gray-50 text-gray-600">
            <td className="p-3"></td>
            <td className="p-3"></td>
            <td className="p-3">{t.result.transactionStatement.total}</td>
            <td className="p-3">{quantity}</td>
            <td className="p-3"></td>
            <td className="p-3">{currency(supplyAmount)}</td>
            <td className="p-3">{currency(taxAmount)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// 비고 컴포넌트
function Remarks({
  issued,
  paymentDate,
  formatDateKo,
  formatTimeKo,
  t,
}: {
  issued: Date;
  paymentDate: Date;
  formatDateKo: (date: Date) => string;
  formatTimeKo: (date: Date) => string;
  t: any;
}) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">
        {t.result.transactionStatement.remarks}
      </h3>
      <div className="space-y-3 text-sm leading-relaxed">
        <RemarkSection title={t.result.transactionStatement.inclusions}>
          <li>{t.result.transactionStatement.inclusionsList.vehicle}</li>
          <li>{t.result.transactionStatement.inclusionsList.fuel}</li>
          <li>{t.result.transactionStatement.inclusionsList.guide}</li>
          <li>{t.result.transactionStatement.inclusionsList.brewery}</li>
          <li>{t.result.transactionStatement.inclusionsList.water}</li>
        </RemarkSection>

        <RemarkSection title={t.result.transactionStatement.exclusions}>
          <li>{t.result.transactionStatement.exclusionsList.meals}</li>
          <li>{t.result.transactionStatement.exclusionsList.personal}</li>
        </RemarkSection>

        <RemarkSection title={t.result.transactionStatement.paymentInformation}>
          <li>{t.result.transactionStatement.paymentMethod}</li>
          <li>
            {t.result.transactionStatement.paymentDateTime}{" "}
            {formatDateKo(paymentDate)} {formatTimeKo(paymentDate)}
          </li>
        </RemarkSection>

        <RemarkSection title={t.result.transactionStatement.cancellationPolicy}>
          <li>{t.result.transactionStatement.cancellationList.fullRefund}</li>
          <li>{t.result.transactionStatement.cancellationList.noRefund}</li>
        </RemarkSection>

        <div className="pt-2">{t.result.transactionStatement.confirmation}</div>
        <div>{formatDateKo(issued)}</div>
        <div className="font-semibold">
          {t.result.transactionStatement.companyName}
        </div>
      </div>
    </div>
  );
}

// 헬퍼 컴포넌트들
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

// 비고 섹션 컴포넌트
function RemarkSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 font-medium">{title}</div>
      <ul className="list-disc space-y-1 pl-5">{children}</ul>
    </div>
  );
}
