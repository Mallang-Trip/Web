import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import Tab from "./Tab";
import ArticleList from "./ArticleList";
import ArticleDetail from "./ArticleDetail";

function CommunityPage() {
  const { id } = useParams();
  const [category, setCategory] = useState("전체");
  console.log(id);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <PageContainer>
      <Title />
      <Tab category={category} setCategory={setCategory} />
      {/* <ArticleList /> */}
      <ArticleDetail />
    </PageContainer>
  );
}

export default CommunityPage;
