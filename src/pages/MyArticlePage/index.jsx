import { useEffect, useState } from "react";
import { getMyArticleList, getMyCommentList } from "../../api/article";
import { useIntersectionObserver } from "../../hooks";
import PageContainer from "../../components/PageContainer";
import ArticleList from "../../components/ArticleList";
import Tab from "./Tab";
import Loading from "../../components/Loading";

function MyArticlePage() {
  const [tabCategory, setTabCategory] = useState("article");
  const [myArticleData, setMyArticleData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [endRef, isIntersecting] = useIntersectionObserver();

  const getMyArticleListFunc = async () => {
    if (page >= totalPages) return;

    try {
      const result =
        tabCategory === "article"
          ? await getMyArticleList(page)
          : await getMyCommentList(page);
      const myArticleDataCopy = page === 0 ? [] : [...myArticleData];
      setTotalPages(result.payload.totalPages || 1);
      setMyArticleData([...myArticleDataCopy, ...result.payload.content]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!isIntersecting) return;
    setTimeout(() => setPage(page + 1), 1000);
  }, [isIntersecting]);

  useEffect(() => {
    getMyArticleListFunc();
  }, [page]);

  useEffect(() => {
    if (page === 0) getMyArticleListFunc();
    setPage(0);

    window.scrollTo({ top: 0 });
  }, [tabCategory]);

  return (
    <PageContainer>
      <div className="text-2xl text-black font-bold">나의 게시글</div>
      <Tab tabCategory={tabCategory} setTabCategory={setTabCategory} />
      <ArticleList articleData={myArticleData} />
      <div
        ref={endRef}
        className={`${
          myArticleData.length === 0 || page >= totalPages - 1
            ? "hidden"
            : "block"
        }`}
      >
        <Loading full={false} />
      </div>
    </PageContainer>
  );
}

export default MyArticlePage;
