import ArticleTitle from "./ArticleTitle";
import ArticleBody from "./ArticleBody";

function ArticleItem({ type }) {
  return (
    <div className="w-full mb-24">
      <ArticleTitle />
      <ArticleBody type={type} />
    </div>
  );
}

export default ArticleItem;
