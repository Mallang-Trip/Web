import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnnouncementDetail } from "../../../api/announcement";
import ArticleTitle from "./ArticleTitle";
import ArticleBody from "./ArticleBody";

function ArticleItem() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [notice, setNotice] = useState({});

  const getAnnouncementDetailFunc = async () => {
    try {
      const result = await getAnnouncementDetail(id);
      setNotice(result.payload);
      if (result.statusCode === 404) {
        alert("이미 삭제되었습니다.");
        navigation("/help/list", { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id === "list") {
      setNotice({});
      return;
    }
    getAnnouncementDetailFunc();
  }, [id]);

  if (id === "list") return null;
  if (!notice?.announcementId) return null;
  return (
    <div className="w-full mt-9 mb-24">
      <ArticleTitle title={notice.title} />
      <ArticleBody {...notice} />
    </div>
  );
}

export default ArticleItem;
