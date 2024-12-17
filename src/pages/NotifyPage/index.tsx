import { memo } from "react";
import { PageContainer, Title } from "@/components";
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
