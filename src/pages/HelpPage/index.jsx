import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import Tab from "./Tab";
import ArticleItem from "./ArticleItem";
import NoticeList from "./NoticeList";
import FAQList from "./FAQList";
import Pagination from "./Pagination";
import Chatting from "./Chatting";

import { notice, faq } from "../../global"; // 임시 더미 데이터

function HelpPage() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [type, setType] = useState("notice");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
    if (id !== "list") navigation("/help/list", { replace: true });
  }, [type]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id, page]);

  return (
    <PageContainer>
      <Title />
      <Tab type={type} setType={setType} />
      {id !== "list" ? (
        <ArticleItem type={type} />
      ) : type === "notice" ? (
        <NoticeList notice={notice} page={page} />
      ) : (
        <FAQList faq={faq} page={page} />
      )}
      {id === "list" && (
        <Pagination
          page={page}
          setPage={setPage}
          length={type === "notice" ? notice.length : faq.length}
        />
      )}
      <Chatting />
    </PageContainer>
  );
}

export default HelpPage;
