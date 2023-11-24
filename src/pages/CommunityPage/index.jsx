import { useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import Tab from "./Tab";

function CommunityPage() {
  const { id } = useParams();
  const [category, setCategory] = useState("전체");
  console.log(id);

  return (
    <PageContainer>
      <Title />
      <Tab category={category} setCategory={setCategory} />
    </PageContainer>
  );
}

export default CommunityPage;
