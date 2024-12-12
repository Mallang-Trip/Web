import { memo } from "react";
import PageContainer from "../../components/PageContainer";
import Title from "../../components/Title";
import IncomeInfo from "./IncomeInfo";
import IncomeTable from "./IncomeTable";

function DriverIncomePage() {
  return (
    <PageContainer>
      <Title title="드라이버 수익 내역" />
      <IncomeInfo />
      <IncomeTable />
    </PageContainer>
  );
}

export default memo(DriverIncomePage);
