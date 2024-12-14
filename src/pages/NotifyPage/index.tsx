import { memo } from "react";
import PageContainer from "../../components/PageContainer";
import Title from "../../components/Title";
import NotifyList from "./NotifyList";

function NotifyPage() {
  return (
    <PageContainer>
      <Title title="받은 알림" className="mb-8" />
      <NotifyList />
    </PageContainer>
  );
}

export default memo(NotifyPage);
