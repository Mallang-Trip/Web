import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleDetail } from "../../../api/article";
import Loading from "../../../components/Loading";
import NoArticleData from "./NoArticleData";
import ArticleBody from "./ArticleBody";
import ArticleComment from "./ArticleComment";

function ArticleDetail({ getArticleListFunc }) {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  const getArticleDetailFunc = async () => {
    try {
      const result = await getArticleDetail(articleId);

      if (result.statusCode === 404) return setLoading(null);
      setArticle(result.payload);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getArticleDetailFunc();
  }, [articleId]);

  if (loading) return <Loading full={true} />;
  if (loading === null) return <NoArticleData />;
  return (
    <>
      <ArticleBody {...article} getArticleListFunc={getArticleListFunc} />
      <ArticleComment
        comments={article.comments}
        getArticleDetailFunc={getArticleDetailFunc}
      />
    </>
  );
}

export default ArticleDetail;
