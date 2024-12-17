import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { getAnnouncementDetail } from "@/api/announcement";
import { Title } from "@/components";
import NoticeButton from "./NoticeButton";
import Notice from "./Notice";

interface Props {
  mode: string | null;
  announcementId: string | number | null;
  setHelpType: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessageModal: Dispatch<SetStateAction<boolean>>;
}

function NoticeDetail({
  mode,
  announcementId,
  setHelpType,
  setMessage,
  setShowMessageModal,
}: Props) {
  const navigation = useNavigate();
  const [notice, setNotice] = useState({
    announcementId: 0,
    type: "ANNOUNCEMENT",
    title: "",
    content: "",
    createdAt: "",
    images: [],
  });

  const getAnnouncementDetailFunc = useCallback(async () => {
    if (!announcementId) return;
    try {
      const result = await getAnnouncementDetail(announcementId.toString());
      setNotice(result.payload);
      if (result.statusCode === 404) {
        alert("이미 삭제된 공지사항 입니다.");
        navigation(-1);
      }
    } catch (e) {
      console.log(e);
    }
  }, [announcementId]);

  useEffect(() => {
    if (mode !== "detail")
      setNotice({
        announcementId: 0,
        type: "ANNOUNCEMENT",
        title: "",
        content: "",
        createdAt: "",
        images: [],
      });
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
        setMessage={setMessage}
        setShowMessageModal={setShowMessageModal}
      />
      <Notice {...notice} />
    </div>
  );
}

export default memo(NoticeDetail);
