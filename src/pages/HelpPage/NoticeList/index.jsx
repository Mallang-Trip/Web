import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnnouncementList } from "../../../api/announcement";
import Loading from "../../../components/Loading";
import Pagination from "../Pagination";
import Head from "./Head";
import Notice from "./Notice";

function NoticeList({ type }) {
  const { id } = useParams();
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);

  const getAnnouncementListFunc = async () => {
    try {
      setLoading(true);
      const result = await getAnnouncementList(type, page);
      setContent(result.payload.content);
      setTotalElements(result.payload.totalElements);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnnouncementListFunc();
  }, [type, page]);

  useEffect(() => {
    setPage(0);
  }, [type]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id, page]);

  if (id !== "list") return null;
  if (loading) return <Loading full={true} />;
  return (
    <>
      <div className="w-full whitespace-nowrap">
        <Head />
        {content.map((item, index) => (
          <Notice
            key={item.announcementId}
            index={10 * page + index + 1}
            {...item}
          />
        ))}
        {content.length === 0 && (
          <div className="text-center mt-10">목록이 비어있습니다.</div>
        )}
      </div>
      <Pagination page={page} setPage={setPage} length={totalElements} />
    </>
  );
}

export default NoticeList;
