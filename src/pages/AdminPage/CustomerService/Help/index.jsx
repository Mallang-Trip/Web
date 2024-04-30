import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ConfirmModal from "../../../../components/ConfirmModal";
import NoticeList from "./NoticeList";
import EditForm from "./EditForm";

function Help() {
  const [searchParams] = useSearchParams();
  const [helpType, setHelpType] = useState("ANNOUNCEMENT");
  const [message, setMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const mode = searchParams.get("mode");
  const articleId = searchParams.get("article_id");

  return (
    <div className="text-base font-medium">
      {mode === "edit" ? (
        <EditForm
          helpType={helpType}
          setMessage={setMessage}
          setShowMessageModal={setShowMessageModal}
        />
      ) : (
        <NoticeList helpType={helpType} setHelpType={setHelpType} />
      )}
      <ConfirmModal
        showModal={showMessageModal}
        setShowModal={setShowMessageModal}
        message={message}
      />
    </div>
  );
}

export default Help;
