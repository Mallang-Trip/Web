import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleList } from "../../api/article";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import Tab from "./Tab";
import ArticleList from "../../components/ArticleList";
import ArticleDetail from "./ArticleDetail";
import Loading from "../../components/Loading";

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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [endRef, isIntersecting] = useIntersectionObserver();

  const getArticleListFunc = async () => {
    if (page >= totalPages) return;

    try {
      const result = await getArticleList(articleType[category], page);
      const articleDataCopy = page === 0 ? [] : [...articleData];
      setTotalPages(result.payload.totalPages || 1);
      setArticleData([...articleDataCopy, ...result.payload.content]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!isIntersecting) return;
    setTimeout(() => setPage(page + 1), 1000);
  }, [isIntersecting]);

  useEffect(() => {
    getArticleListFunc();
  }, [page]);

  useEffect(() => {
    if (page === 0) getArticleListFunc();
    setPage(0);
  }, [category]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
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
      <div
        ref={endRef}
        className={`${
          articleId !== "main" ||
          articleData.length === 0 ||
          page >= totalPages - 1
            ? "hidden"
            : "block"
        }`}
      >
        <Loading full={false} />
      </div>
    </PageContainer>
  );
}

export default CommunityPage;
