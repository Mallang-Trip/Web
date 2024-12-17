import { memo, useRef, useState } from "react";
import { PageContainer, Title, Credit } from "@/components";

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
