import NoArticleData from "./NoArticleData";
import ArticleItem from "./ArticleItem";

function ArticleList({ articleData }) {
  if (articleData.length === 0) return <NoArticleData />;
  return (
    <div>
      {articleData.map(
        (article) =>
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

export default ArticleList;
