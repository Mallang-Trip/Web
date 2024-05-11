import { useNavigate } from "react-router-dom";
import { priceToString } from "../../../../utils";

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
}) {
  const navigation = useNavigate();
  const paymentDate = type === "payment" ? paymentTime : refundTime;
  const amount = type === "payment" ? paymentAmount : refundAmount;
  const url = type === "payment" ? receiptUrl : cancelReceiptUrl;
  const successStatus = status.includes("COMPLETE") ? "완료" : "실패";
  const paymentStatus =
    type === "payment" ? `결제 ${successStatus}` : `환불 ${successStatus}`;

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

export default Body;
