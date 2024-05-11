import PageContainer from "../../components/PageContainer";
import Title from "../../components/Title";
import PaymentTable from "./PaymentTable";

function MyPaymentListPage() {
  return (
    <PageContainer>
      <Title title="나의 결제/환불 내역" />
      <PaymentTable paymentList={[1]} />
    </PageContainer>
  );
}

export default MyPaymentListPage;
