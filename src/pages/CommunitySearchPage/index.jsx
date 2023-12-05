import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchArticle } from "../../api/article";
import PageContainer from "../../components/PageContainer";
import Title from "../CommunityPage/Title";
import SearchKeyword from "./SearchKeyword";
import ArticleList from "../../components/ArticleList";

function CommunitySearchPage() {
  const { keyword } = useParams();
  const [articleData, setArticleData] = useState([]);

  const getArticleData = async () => {
    try {
      const result = await searchArticle(keyword, "all", 0);
      setArticleData(result.payload.content);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getArticleData();

    window.scrollTo({
      top: 0,
    });
  }, [keyword]);

  return (
    <PageContainer>
      <Title />
      <SearchKeyword />
      <ArticleList articleData={articleData} />
    </PageContainer>
  );
}

export default CommunitySearchPage;
