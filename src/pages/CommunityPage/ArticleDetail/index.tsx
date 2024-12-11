import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleDetail } from "../../../api/article";
import { ArticleDetailType } from "../../../types";
import Loading from "../../../components/Loading";
import NoArticleData from "./NoArticleData";
import ArticleBody from "./ArticleBody";
import ArticleComment from "./ArticleComment";

interface Props {
  getArticleListFunc: () => void;
}

function ArticleDetail({ getArticleListFunc }: Props) {
  const { articleId } = useParams();
  const [loading, setLoading] = useState<boolean | null>(true);
  const [article, setArticle] = useState<ArticleDetailType>({
    articleId: 0,
    comments: [],
    commentsCount: 0,
    content: "",
    createdAt: "",
    dibs: false,
    images: [],
    nickname: "",
    partyId: null,
    partyName: null,
    profileImg: undefined,
    title: "",
    type: "",
    updatedAt: "",
    userId: 0,
  });

  const getArticleDetailFunc = useCallback(async () => {
    try {
      const result = await getArticleDetail(articleId);

      if (result.statusCode === 404) return setLoading(null);
      setArticle(result.payload);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [articleId]);

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

export default memo(ArticleDetail);
