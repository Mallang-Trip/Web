import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import IncomeInfo from "./IncomeInfo";
import IncomeTable from "./IncomeTable";

function DriverIncomePage() {
  return (
    <PageContainer>
      <Title />
      <IncomeInfo />
      <IncomeTable />
    </PageContainer>
  );
}

export default DriverIncomePage;
