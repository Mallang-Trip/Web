import { lazy, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getUserInfo } from "../../../api/users";
import img_close_modal from "../../../assets/svg/closeModal.svg";
import ModalCloser from "./ModalCloser";
import ButtonBox from "./ButtonBox";
import ProfileInfo from "./ProfileInfo";
import SuspensionModal from "../SuspensionModal";
import Loading from "../../Loading";

function AdminProfileModal({ showModal, setShowModal, userId, reportId }) {
  const modalRef = useRef();
  const $body = document.body;
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuspensionModal, setShowSuspensionModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  const getUserInfoFunc = async () => {
    if (userId === 0) return;
    setLoading(true);
    try {
      const result = await getUserInfo(userId);
      setUserInfo(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showModal) return;

    getUserInfoFunc();

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal, userId, reportId]);

  return createPortal(
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
      id="user-profile-modal"
    >
      <div className="flex flex-col items-center justify-center m-auto shadow w-[31.25rem] h-[31.25rem] bg-white rounded-xl">
        <ModalCloser closeModal={() => setShowModal(false)} />
        {loading ? (
          <div className="w-full h-[344px] flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex justify-end w-full p-3">
              <img
                className="cursor-pointer"
                alt=""
                src={img_close_modal}
                onClick={closeModal}
              />
            </div>
            <ProfileInfo {...userInfo} />
            <ButtonBox
              userId={userInfo.userId}
              nickname={userInfo.nickname}
              setShowModal={setShowModal}
              setShowSuspensionModal={setShowSuspensionModal}
            />
          </>
        )}
      </div>
      <SuspensionModal
        showModal={showSuspensionModal}
        setShowModal={setShowSuspensionModal}
        handleClose={() => setShowModal(true)}
        userId={userId}
        reportId={reportId}
      />
    </div>,
    $body
  );
}

export default AdminProfileModal;
