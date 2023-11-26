import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import ArticleInfoForm from "./ArticleInfoForm";

function CommunityPostPage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [id]);

  return (
    <PageContainer>
      <Title />
      <ArticleInfoForm />
    </PageContainer>
  );
}

export default CommunityPostPage;
