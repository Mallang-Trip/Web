import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ConfirmModal from "../../../../components/ConfirmModal";
import NoticeList from "./NoticeList";
import EditForm from "./EditForm";
import NoticeDetail from "./NoticeDetail";

function Help() {
  const [searchParams] = useSearchParams();
  const [helpType, setHelpType] = useState("ANNOUNCEMENT");
  const [message, setMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const mode = searchParams.get("mode");
  const announcementId = searchParams.get("announcement_id");

  return (
    <div className="text-base font-medium">
      <EditForm
        mode={mode}
        helpType={helpType}
        announcementId={announcementId}
        setMessage={setMessage}
        setShowMessageModal={setShowMessageModal}
        setHelpType={setHelpType}
      />
      <NoticeList mode={mode} helpType={helpType} setHelpType={setHelpType} />
      <NoticeDetail
        mode={mode}
        announcementId={announcementId}
        setHelpType={setHelpType}
        setMessage={setMessage}
        setShowMessageModal={setShowMessageModal}
      />
      <ConfirmModal
        showModal={showMessageModal}
        setShowModal={setShowMessageModal}
        message={message}
      />
    </div>
  );
}

export default Help;
