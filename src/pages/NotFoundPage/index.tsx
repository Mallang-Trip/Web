import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer, Loading } from "@/components";

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

export default memo(NotFoundPage);
