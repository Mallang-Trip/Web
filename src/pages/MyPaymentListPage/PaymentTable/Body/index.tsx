import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { priceToString } from "../../../../utils";
import { Payment } from "../../../../types";

interface Props extends Payment {
  type: "payment" | "refund";
}

function Body({
  type,
  partyId,
  partyName,
  partyStartDate,
  paymentTime,
  refundTime,
  paymentAmount,
  refundAmount,
  status,
  receiptUrl,
  cancelReceiptUrl,
}: Props) {
  const navigation = useNavigate();

  const paymentDate = useMemo(
    () => (type === "payment" ? paymentTime : refundTime),
    [type, paymentTime, refundTime]
  );

  const amount = useMemo(
    () => (type === "payment" ? paymentAmount : refundAmount),
    [type, paymentAmount, refundAmount]
  );

  const url = useMemo(
    () => (type === "payment" ? receiptUrl : cancelReceiptUrl),
    [type, receiptUrl, cancelReceiptUrl]
  );

  const successStatus = useMemo(
    () => (status.includes("COMPLETE") ? "완료" : "실패"),
    [status]
  );

  const paymentStatus = useMemo(
    () =>
      type === "payment" ? `결제 ${successStatus}` : `환불 ${successStatus}`,
    [type, successStatus]
  );

  return (
    <div className="w-full py-3 grid grid-cols-6 items-center text-center bg-white border border-gray300 rounded-xl">
      <button
        className="px-1 text-primary font-medium"
        onClick={() => navigation(`/party/detail/${partyId}`)}
      >
        {partyName}
      </button>
      <p className="px-1 text-gray500 font-medium">
        {partyStartDate.replaceAll("-", ".")}
      </p>
      <p className="px-1 text-gray500 font-medium">
        {paymentDate.replaceAll("-", ".").replace("T", " ")}
      </p>
      <p className="px-1 text-gray700 font-medium">{`${priceToString(amount)}원`}</p>
      <p className="px-1 text-gray700 font-medium">{paymentStatus}</p>
      {url && (
        <button
          className="px-1 text-[#3F8EE6] font-medium"
          onClick={() => {
            const newWindow = window.open(url, "_blank", "noopener,noreferrer");
            if (newWindow) newWindow.opener = null;
          }}
        >
          영수증
        </button>
      )}
    </div>
  );
}

export default memo(Body);
