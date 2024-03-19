import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import PageContainer from "../../components/PageContainer";

function NotFoundPage() {
  const navigation = useNavigate();

  useEffect(() => {
    navigation("/", { replace: true });
  }, []);

  return (
    <PageContainer>
      <Loading full={true} />
    </PageContainer>
  );
}

export default NotFoundPage;
