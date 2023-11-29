import ArticleItem from "./ArticleItem";

function ArticleList({ articleData }) {
  return (
    <div>
      {articleData.map((article) => (
        <ArticleItem key={article.articleId} {...article} />
      ))}
    </div>
  );
}

export default ArticleList;
