import NoArticleData from "./NoArticleData";
import ArticleItem from "./ArticleItem";

function ArticleList({ articleData }) {
  if (articleData.length === 0) return <NoArticleData />;
  return (
    <div>
      {articleData.map((article) => (
        <ArticleItem key={article.articleId} {...article} />
      ))}
    </div>
  );
}

export default ArticleList;
