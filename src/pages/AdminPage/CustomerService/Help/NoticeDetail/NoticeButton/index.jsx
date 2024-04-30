import { useNavigate } from "react-router-dom";
import { deleteAnnouncement } from "../../../../../../api/announcement";

function NoticeButton({
  announcementId,
  type,
  setHelpType,
  setMessage,
  setShowMessageModal,
}) {
  const navigation = useNavigate();

  const deleteAnnouncementFunc = async () => {
    try {
      await deleteAnnouncement(announcementId);
      setMessage("공지사항이 삭제되었습니다.");
      navigation(-1);
    } catch (e) {
      console.log(e);
      setMessage("공지사항이 삭제에 실패했습니다.");
    } finally {
      setShowMessageModal(true);
    }
  };

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
        onClick={() => {
          setHelpType(type);
          navigation(
            `/admin/help?mode=edit&announcement_id=${announcementId}`,
            { replace: true }
          );
        }}
      >
        수정
      </button>
    </div>
  );
}

export default NoticeButton;
