import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleList } from "../../api/article";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import Tab from "./Tab";
import ArticleList from "../../components/ArticleList";
import ArticleDetail from "./ArticleDetail";

const articleType = {
  전체: "all",
  자유게시판: "FREE_BOARD",
  동행구해요: "FIND_PARTNER",
  피드백: "FEEDBACK",
};

function CommunityPage() {
  const { articleId } = useParams();
  const [category, setCategory] = useState("전체");
  const [articleData, setArticleData] = useState([]);

  const getArticleListFunc = async () => {
    try {
      const result = await getArticleList(articleType[category], 0);
      setArticleData(result.payload.content);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getArticleListFunc();
  }, [category]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [articleId]);

  return (
    <PageContainer>
      <Title />
      <Tab category={category} setCategory={setCategory} />
      {articleId === "main" ? (
        <ArticleList articleData={articleData} />
      ) : (
        <ArticleDetail />
      )}
    </PageContainer>
  );
}

export default CommunityPage;
