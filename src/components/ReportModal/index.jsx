import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { postNewReport } from "../../api/users";
import Loading from "../../components/Loading";

function ReportModal({ showModal, setShowModal, reporteeId, targetId, type }) {
  const modalRef = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [content, setContent] = useState("");

  const submitReport = async () => {
    if (loading) return;
    if (content === "") return alert("신고 사유를 입력해주세요.");
    setLoading(true);

    try {
      const body = {
        content: content,
        reporteeId: reporteeId,
        targetId: targetId,
        type: type,
      };

      await postNewReport(body);

      setMessage("신고가 접수되었습니다.");
      setComplete(true);
    } catch (e) {
      console.log(e);
      alert("신고 접수에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (loading) return;
    setShowModal(false);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
    else if (event.key === "Enter") {
      if (!complete) submitReport();
      else closeModal();
    }
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setComplete(false);
    setLoading(false);
    setContent("");
    setMessage("");

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return createPortal(
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="w-full px-5 flex flex-col justify-center h-80 text-center text-xl text-black font-bold whitespace-pre bg-white rounded-t-xl">
          {loading ? (
            <Loading />
          ) : (
            message || (
              <div>
                <p>
                  허위 신고시 불이익을 당할 수 있습니다.
                  <br />
                  신고 사유를 입력해주세요.
                </p>
                <textarea
                  placeholder="신고 사유를 입력해주세요."
                  className="w-full h-44 mt-5 rounded-xl border border-black text-black font-medium p-3 text-sm placeholder:text-[#6F6F6F] focus:border-primary focus:outline-none resize-none noScrollBar"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                />
              </div>
            )
          )}
        </div>
        {!complete ? (
          <div className="flex">
            <button
              className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
              onClick={submitReport}
            >
              확인
            </button>
          </div>
        ) : (
          <button
            className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
            onClick={closeModal}
          >
            확인
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}

export default ReportModal;
