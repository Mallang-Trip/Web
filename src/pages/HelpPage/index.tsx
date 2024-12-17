import { memo, useState } from "react";
import { PageContainer, Title } from "@/components";
import Tab from "./Tab";
import ArticleItem from "./ArticleItem";
import NoticeList from "./NoticeList";
import Chatting from "./Chatting";

function HelpPage() {
  const [type, setType] = useState("ANNOUNCEMENT");

  return (
    <PageContainer>
      <Title title="말랑트립 고객센터" />
      <Tab type={type} setType={setType} />
      <NoticeList type={type} />
      <ArticleItem />
      <Chatting />
    </PageContainer>
  );
}

export default memo(HelpPage);
