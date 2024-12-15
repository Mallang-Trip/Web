import { Fragment, memo } from "react";
import { Payment } from "../../../types";
import Head from "./Head";
import Body from "./Body";

interface Props {
  paymentList: Payment[];
}

function PaymentTable({ paymentList }: Props) {
  if (paymentList.length === 0)
    return (
      <div className="mt-20 text-base text-black font-medium text-center">
        나의 결제/환불 내역이 없습니다.
      </div>
    );
  return (
    <div className="w-full mt-10 flex flex-col gap-2 text-xs sm:text-sm font-semibold">
      <Head />
      {paymentList.map((payment) => (
        <Fragment key={payment.partyId}>
          {payment.cancelReceiptUrl && <Body type="refund" {...payment} />}
          {payment.receiptUrl && <Body type="payment" {...payment} />}
        </Fragment>
      ))}
    </div>
  );
}

export default memo(PaymentTable);
