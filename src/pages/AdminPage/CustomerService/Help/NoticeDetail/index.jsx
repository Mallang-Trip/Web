import { useEffect, useState } from "react";
import { getAnnouncementDetail } from "../../../../../api/announcement";
import Title from "../../../../../components/Title";
import NoticeButton from "./NoticeButton";
import Notice from "./Notice";

function NoticeDetail({ mode, announcementId, setHelpType }) {
  const [notice, setNotice] = useState({});

  const getAnnouncementDetailFunc = async () => {
    try {
      const result = await getAnnouncementDetail(announcementId);
      setNotice(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (mode !== "detail") setNotice({});
    else getAnnouncementDetailFunc();
  }, [mode, announcementId]);

  if (mode !== "detail" || !notice?.announcementId) return null;
  return (
    <div>
      <Title title="말랑트립 고객센터" />
      <NoticeButton
        announcementId={notice?.announcementId}
        type={notice?.type}
        setHelpType={setHelpType}
      />
      <Notice {...notice} />
    </div>
  );
}

export default NoticeDetail;
