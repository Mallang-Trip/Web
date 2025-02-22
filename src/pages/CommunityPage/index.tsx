import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleList } from "@/api/article";
import { useIntersectionObserver } from "@/hooks";
import { ArticleCategoryType, Article } from "@/types";
import { PageContainer, ArticleList, Loading } from "@/components";
import Title from "./Title";
import Tab from "./Tab";
import ArticleDetail from "./ArticleDetail";
import SearchBar from "./SearchBar";
import clsx from "clsx";
import TripSoda from "./TripSoda";

function CommunityPage() {
  const { articleId } = useParams();
  const [category, setCategory] = useState<ArticleCategoryType>("전체");
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [endRef, isIntersecting] = useIntersectionObserver<HTMLDivElement>();

  const articleType = useMemo(
    () => ({
      전체: "all",
      자유게시판: "FREE_BOARD",
      동행구해요: "FIND_PARTNER",
      피드백: "FEEDBACK",
    }),
    []
  );

  const getArticleListFunc = useCallback(async () => {
    if (page >= totalPages) return;

    try {
      const result = await getArticleList(articleType[category], page);
      const articleDataCopy = page === 0 ? [] : [...articleData];
      setTotalPages(result.payload.totalPages || 1);
      setArticleData([...articleDataCopy, ...result.payload.content]);
    } catch (e) {
      console.log(e);
    }
  }, [page, totalPages, articleType, category, articleData]);

  useEffect(() => {
    if (!isIntersecting) return;
    setTimeout(() => setPage(page + 1), 10);
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
      <SearchBar />
      <Tab category={category} setCategory={setCategory} />
      <TripSoda />
      {articleId === "main" ? (
        <ArticleList articleData={articleData} />
      ) : (
        <ArticleDetail getArticleListFunc={getArticleListFunc} />
      )}
      <div
        ref={endRef}
        className={clsx(
          articleId !== "main" ||
            articleData.length === 0 ||
            page >= totalPages - 1
            ? "hidden"
            : "block"
        )}
      >
        <Loading full={false} />
      </div>
    </PageContainer>
  );
}

export default memo(CommunityPage);
