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
  if ((data as { error?: boolean }).error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
        거래명세서를 불러오지 못했습니다.{" "}
        {(data as { message?: string }).message}
      </div>
    );
  }

  const statement = data as TransactionStatement;
  const issued = new Date(statement.issuedDate);
  const paymentDate = new Date(statement.transactionDetail.paymentDate);

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
      />

      {/* 공급자 정보 */}
      <SupplierInfo />

      {/* 공급받는 자 정보 */}
      <CustomerInfo customer={statement.customer} />

      {/* 합계 금액 */}
      <TotalAmount totalAmount={totalAmount} currency={currency} />

      {/* 거래 상세 내역 */}
      <TransactionDetail
        statement={statement}
        formatDate={formatDate}
        currency={currency}
        quantity={quantity}
        unitPrice={unitPrice}
        supplyAmount={supplyAmount}
        taxAmount={taxAmount}
      />

      {/* 합계 테이블 */}
      <QuantityTable
        quantity={quantity}
        supplyAmount={supplyAmount}
        taxAmount={taxAmount}
        currency={currency}
      />

      {/* 비고 */}
      <Remarks
        issued={issued}
        paymentDate={paymentDate}
        formatDateKo={formatDateKo}
        formatTimeKo={formatTimeKo}
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
}: {
  issued: Date;
  formatDate: (date: Date) => string;
  formatDateKo: (date: Date) => string;
  customer: TransactionStatement["customer"];
}) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-gray-200">
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
          {customer?.name || "고객"} 귀하
        </div>
      </div>
    </div>
  );
}

// 공급자 정보 컴포넌트
function SupplierInfo() {
  return (
    <div>
      <h3 className="mb-2 font-semibold">공급자 (Supplier)</h3>
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-md border border-gray-200 text-sm">
        <InfoCell label="상호" value="말랑트립" />
        <InfoCell label="사업자등록번호" value="399-51-00784" />
        <InfoCell label="대표" value="김제윤" />
        <InfoCell
          label="주소"
          value="경기도 안양시 시민대로327번길 11-41, 310호"
        />
        <InfoCell label="연락처" value="0507-1344-4159 (+82-507-1344-4159)" />
        <InfoCell label="이메일" value="mallangtrip@mallangtrip.com" />
      </div>
    </div>
  );
}

// 공급받는 자 정보 컴포넌트
function CustomerInfo({
  customer,
}: {
  customer: TransactionStatement["customer"];
}) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">공급받는 자 (Customer)</h3>
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-md border border-gray-200 text-sm">
        <InfoCell label="예약자명" value={customer?.name} />
        <InfoCell label="연락처" value={customer?.phoneNumber} />
        <div className="bg-gray-100 p-3 font-semibold text-gray-700">
          이메일
        </div>
        <div className="col-span-1 bg-white p-3 break-all">
          {customer?.email}
        </div>
        <InfoCell
          label="탑승 인원"
          value={`${Number(customer?.passengerCount || 0)}인`}
        />
      </div>
    </div>
  );
}

// 합계 금액 컴포넌트
function TotalAmount({
  totalAmount,
  currency,
}: {
  totalAmount: number;
  currency: (n: number) => string;
}) {
  return (
    <div className="text-right text-lg font-semibold">
      합계 금액 (Total Amount): {currency(totalAmount)}
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
}: {
  statement: TransactionStatement;
  formatDate: (date: Date) => string;
  currency: (n: number) => string;
  quantity: number;
  unitPrice: number;
  supplyAmount: number;
  taxAmount: number;
}) {
  const paymentDate = new Date(statement.transactionDetail.paymentDate);

  return (
    <div>
      <h3 className="mb-2 font-semibold">
        거래 상세 내역 (Transaction Details)
      </h3>
      <div className="overflow-x-auto rounded-md border border-gray-200">
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
}: {
  quantity: number;
  supplyAmount: number;
  taxAmount: number;
  currency: (n: number) => string;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
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
  );
}

// 비고 컴포넌트
function Remarks({
  issued,
  paymentDate,
  formatDateKo,
  formatTimeKo,
}: {
  issued: Date;
  paymentDate: Date;
  formatDateKo: (date: Date) => string;
  formatTimeKo: (date: Date) => string;
}) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">비고 (Remarks)</h3>
      <div className="space-y-3 text-sm leading-relaxed">
        <RemarkSection title="1. 포함 내역 (Inclusions):">
          <li>프라이빗 전용 차량 및 전문 드라이버 (Door-to-Door 서비스)</li>
          <li>유류비, 주차비, 통행료 일체</li>
          <li>전문 통역 안내 서비스</li>
          <li>
            말랑트립이 큐레이션 해드리는 양조장 2곳 투어 및 체험비 (시음 포함)
          </li>
          <li>차량 내 생수 제공</li>
        </RemarkSection>

        <RemarkSection title="2. 불포함 내역 (Exclusions):">
          <li>모든 식사 비용 (점심, 저녁 등)</li>
          <li>개인 경비 및 여행자 보험</li>
        </RemarkSection>

        <RemarkSection title="3. 결제 정보 (Payment Information):">
          <li>결제수단: 신용카드</li>
          <li>
            결제일시: {formatDateKo(paymentDate)} {formatTimeKo(paymentDate)}
          </li>
        </RemarkSection>

        <RemarkSection title="4. 취소 및 환불 규정 (Cancellation & Refund Policy):">
          <li>투어일 기준 4일 전까지 취소 시: 전액 환불</li>
          <li>투어일 기준 3일 전부터 취소 시: 환불 불가</li>
        </RemarkSection>

        <div className="pt-2">위와 같이 거래하였음을 확인합니다.</div>
        <div>{formatDateKo(issued)}</div>
        <div className="font-semibold">말랑트립</div>
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
