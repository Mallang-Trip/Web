import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import ArticleList from "../../components/ArticleList";

function MyArticlePage() {
  const [tabCategory, setTabCategory] = useState("article");

  return (
    <PageContainer>
      <div className="text-2xl text-black font-bold">나의 게시글</div>
      <div className="flex gap-2 my-9">
        <button
          className={`${
            tabCategory === "article"
              ? "bg-primary text-white border-primary"
              : "bg-white text-darkgray border-darkgray"
          } border text-sm px-5 py-1.5 rounded-full`}
          onClick={() => setTabCategory("article")}
        >
          게시글 목록
        </button>
        <button
          className={`${
            tabCategory === "comment"
              ? "bg-primary text-white border-primary"
              : "bg-white text-darkgray border-darkgray"
          } border text-sm px-5 py-1.5 rounded-full`}
          onClick={() => setTabCategory("comment")}
        >
          댓글 목록
        </button>
        <button
          className={`${
            tabCategory === "review"
              ? "bg-primary text-white border-primary"
              : "bg-white text-darkgray border-darkgray"
          } border text-sm px-5 py-1.5 rounded-full`}
          onClick={() => setTabCategory("review")}
        >
          리뷰 목록
        </button>
      </div>
      <ArticleList />
    </PageContainer>
  );
}

export default MyArticlePage;
