import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Title from "../CommunityPage/Title";
import SearchKeyword from "./SearchKeyword";
import ArticleList from "../CommunityPage/ArticleList";

function CommunitySearchPage() {
  const { keyword } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [keyword]);

  return (
    <PageContainer>
      <Title />
      <SearchKeyword />
      <ArticleList />
    </PageContainer>
  );
}

export default CommunitySearchPage;
