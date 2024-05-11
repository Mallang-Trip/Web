import { useEffect, useState } from "react";
import { getMyPaymentList } from "../../api/card";
import PageContainer from "../../components/PageContainer";
import Title from "../../components/Title";
import Loading from "../../components/Loading";
import PaymentTable from "./PaymentTable";

function MyPaymentListPage() {
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyPaymentListFunc = async () => {
    try {
      const result = await getMyPaymentList();
      setPaymentList(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

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

export default MyPaymentListPage;
