import { useEffect, useState } from "react";
import { getMyArticleList, getMyCommentList } from "../../api/article";
import PageContainer from "../../components/PageContainer";
import ArticleList from "../../components/ArticleList";
import Tab from "./Tab";

function MyArticlePage() {
  const [tabCategory, setTabCategory] = useState("article");
  const [myArticleData, setMyArticleData] = useState([]);

  const getMyArticleListFunc = async () => {
    try {
      const result =
        tabCategory === "article"
          ? await getMyArticleList(0)
          : await getMyCommentList(0);
      setMyArticleData(result.payload.content);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyArticleListFunc();
  }, [tabCategory]);

  return (
    <PageContainer>
      <div className="text-2xl text-black font-bold">나의 게시글</div>
      <Tab tabCategory={tabCategory} setTabCategory={setTabCategory} />
      <ArticleList articleData={myArticleData} />
    </PageContainer>
  );
}

export default MyArticlePage;
