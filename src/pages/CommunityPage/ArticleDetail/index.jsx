import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleDetail } from "../../../api/article";
import ArticleBody from "./ArticleBody";
import ArticleComment from "./ArticleComment";

function ArticleDetail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [reload, setReload] = useState(false);

  const reloadArticle = () => setReload(!reload);

  const getArticleDetailFunc = async () => {
    try {
      const result = await getArticleDetail(articleId);
      setArticle(result.payload);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getArticleDetailFunc();
  }, [articleId, reload]);

  if (!article.articleId) return null;
  return (
    <>
      <ArticleBody {...article} />
      <ArticleComment
        comments={article.comments}
        reloadArticle={reloadArticle}
      />
    </>
  );
}

export default ArticleDetail;