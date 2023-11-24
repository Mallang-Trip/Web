import { useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import Tab from "./Tab";
import ArticleList from "./ArticleList";

function CommunityPage() {
  const { id } = useParams();
  const [category, setCategory] = useState("전체");
  console.log(id);

  return (
    <PageContainer>
      <Title />
      <Tab category={category} setCategory={setCategory} />
      <ArticleList />
    </PageContainer>
  );
}

export default CommunityPage;
