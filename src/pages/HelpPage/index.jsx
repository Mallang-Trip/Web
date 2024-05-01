import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import Tab from "./Tab";
import ArticleItem from "./ArticleItem";
import NoticeList from "./NoticeList";
import Chatting from "./Chatting";

function HelpPage() {
  const [type, setType] = useState("ANNOUNCEMENT");

  return (
    <PageContainer>
      <Title />
      <Tab type={type} setType={setType} />
      <NoticeList type={type} />
      <ArticleItem />
      <Chatting />
    </PageContainer>
  );
}

export default HelpPage;
