import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchArticle } from "../../api/article";
import { useIntersectionObserver } from "../../hooks";
import { Article } from "../../types";
import PageContainer from "../../components/PageContainer";
import Title from "../CommunityPage/Title";
import SearchKeyword from "./SearchKeyword";
import ArticleList from "../../components/ArticleList";
import Loading from "../../components/Loading";
import SearchBar from "../CommunityPage/SearchBar";
import clsx from "clsx";

function CommunitySearchPage() {
  const { keyword } = useParams();
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [endRef, isIntersecting] = useIntersectionObserver<HTMLDivElement>();

  const getArticleData = useCallback(async () => {
    if (page >= totalPages) return;

    try {
      const result = await searchArticle(keyword, "all", page);
      const articleDataCopy = page === 0 ? [] : [...articleData];
      setTotalPages(result.payload.totalPages || 1);
      setArticleData([...articleDataCopy, ...result.payload.content]);
    } catch (e) {
      console.log(e);
    }
  }, [page, totalPages, keyword, articleData]);

  useEffect(() => {
    if (!isIntersecting) return;
    setTimeout(() => setPage(page + 1), 1000);
  }, [isIntersecting]);

  useEffect(() => {
    getArticleData();
  }, [page]);

  useEffect(() => {
    if (page === 0) getArticleData();
    setPage(0);

    window.scrollTo({ top: 0 });
  }, [keyword]);

  return (
    <PageContainer>
      <Title />
      <SearchBar />
      <SearchKeyword />
      <ArticleList articleData={articleData} />
      <div
        ref={endRef}
        className={clsx(
          articleData.length === 0 || page >= totalPages - 1
            ? "hidden"
            : "block"
        )}
      >
        <Loading full={false} />
      </div>
    </PageContainer>
  );
}

export default memo(CommunitySearchPage);
