import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnnouncementList } from "../../../../../api/announcement";
import EditButton from "../../../../../components/EditButton";
import Title from "../../../../../components/Title";
import Pagination from "../../../../HelpPage/Pagination";
import HelpTab from "./HelpTab";
import Head from "./Head";
import Notice from "./Notice";

function NoticeList({ helpType, setHelpType }) {
  const navigation = useNavigate();
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [content, setContent] = useState([]);

  const getAnnouncementListFunc = async () => {
    try {
      const result = await getAnnouncementList(helpType, page);
      setContent(result.payload.content);
      setTotalElements(result.payload.totalElements);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnnouncementListFunc();
  }, [page]);

  useEffect(() => {
    setPage(0);
    getAnnouncementListFunc();
  }, [helpType]);

  return (
    <div>
      <Title title="고객센터 글 작성/수정/삭제" />
      <HelpTab helpType={helpType} setHelpType={setHelpType} />
      <EditButton
        className="ml-auto mb-4"
        title="글 작성"
        onClick={() => navigation("/admin/help?mode=edit&article_id=new")}
      />
      <div className="w-full whitespace-nowrap">
        <Head />
        {content.map((item, index) => (
          <Notice
            key={item.announcementId}
            index={10 * page + index + 1}
            {...item}
          />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} length={totalElements} />
    </div>
  );
}

export default NoticeList;
