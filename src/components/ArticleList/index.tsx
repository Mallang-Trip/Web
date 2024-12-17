import { memo } from "react";
import { Article } from "@/types";
import NoArticleData from "./NoArticleData";
import ArticleItem from "./ArticleItem";

interface Props {
  articleData: Article[];
}

function ArticleList({ articleData }: Props) {
  if (articleData.length === 0) return <NoArticleData />;
  return (
    <div>
      {articleData.map(
        (article: Article) =>
          !article.articleDeleted && (
            <ArticleItem
              key={article.articleId + article.createdAt}
              {...article}
            />
          )
      )}
    </div>
  );
}

export default memo(ArticleList);
