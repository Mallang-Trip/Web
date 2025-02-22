import { memo, useCallback, useEffect, useState } from "react";
import { getMyPaymentList } from "@/api/card";
import { Payment } from "@/types";
import { PageContainer, Title, Loading } from "@/components";
import PaymentTable from "./PaymentTable";

function MyPaymentListPage() {
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const getMyPaymentListFunc = useCallback(async () => {
    try {
      const result = await getMyPaymentList();
      setPaymentList(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMyPaymentListFunc();
  }, []);

  if (loading) return <Loading full={true} />;
  return (
    <PageContainer>
      <Title title="나의 결제/환불 내역" />
      <PaymentTable paymentList={paymentList} />
    </PageContainer>
  );
}

export default memo(MyPaymentListPage);
