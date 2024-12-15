import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAnnouncement } from "../../../../../../api/announcement";

interface Props {
  announcementId: number;
  type: string;
  setHelpType: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowMessageModal: Dispatch<SetStateAction<boolean>>;
}

function NoticeButton({
  announcementId,
  type,
  setHelpType,
  setMessage,
  setShowMessageModal,
}: Props) {
  const navigation = useNavigate();

  const deleteAnnouncementFunc = useCallback(async () => {
    if (!announcementId) return;
    try {
      await deleteAnnouncement(announcementId.toString());
      setMessage("공지사항이 삭제되었습니다.");
      navigation(-1);
    } catch (e) {
      console.log(e);
      setMessage("공지사항이 삭제에 실패했습니다.");
    } finally {
      setShowMessageModal(true);
    }
  }, [announcementId]);

  const modifyHandler = useCallback(() => {
    setHelpType(type);
    navigation(`/admin/help?mode=edit&announcement_id=${announcementId}`, {
      replace: true,
    });
  }, [type, announcementId]);

  return (
    <div className="flex justify-end items-center gap-4 mt-10 mb-4">
      <button
        className="px-6 py-2.5 text-sm text-darkgray font-bold bg-white border border-mediumgray hover:border-[#ff0000] hover:text-[#ff0000] rounded-lg"
        onClick={deleteAnnouncementFunc}
      >
        삭제
      </button>
      <button
        className="px-6 py-2.5 text-sm text-darkgray font-bold bg-white border border-mediumgray hover:border-primary hover:text-primary rounded-lg"
        onClick={modifyHandler}
      >
        수정
      </button>
    </div>
  );
}

export default memo(NoticeButton);
