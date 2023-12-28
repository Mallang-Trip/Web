import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import Tab from "./Tab";
import NoticeList from "./NoticeList";
import Pagination from "./Pagination";
import Chatting from "./Chatting";

import { notice, faq } from "../../global";
import FAQList from "./FAQList";

function HelpPage() {
  const { id } = useParams();
  const [type, setType] = useState("notice");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [type]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id, page]);

  return (
    <PageContainer>
      <Title />
      <Tab type={type} setType={setType} />
      {id === "list" && type === "notice" ? (
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
