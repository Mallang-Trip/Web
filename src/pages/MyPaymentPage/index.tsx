import { memo, useRef, useState } from "react";
import PageContainer from "../../components/PageContainer";
import Title from "../../components/Title";
import Credit from "../../components/Credit";

function MyPaymentPage() {
  const creditRef = useRef<HTMLDivElement | null>(null);
  const [registerCredit, setRegisterCredit] = useState(false);

  return (
    <PageContainer>
      <Title title="결제 수단 관리" />
      <Credit
        shakeCredit={false}
        register={registerCredit}
        setRegister={setRegisterCredit}
        creditRef={creditRef}
      />
    </PageContainer>
  );
}

export default memo(MyPaymentPage);
