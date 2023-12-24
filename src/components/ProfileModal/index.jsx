import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getUserInfo } from "../../api/users";
import ModalCloser from "./ModalCloser";
import ButtonBox from "./ButtonBox";
import ProfileInfo from "./ProfileInfo";

function ProfileModal({ showModal, setShowModal, userId = 0 }) {
  const modalRef = useRef();
  const $body = document.body;
  const [userInfo, setUserInfo] = useState({});

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  const getUserInfoFunc = async () => {
    if (userId === 0) return;

    try {
      const result = await getUserInfo(userId);
      setUserInfo(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!showModal) return;

    getUserInfoFunc();

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return createPortal(
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
      id="user-profile-modal"
    >
      <div className="m-auto shadow w-96 bg-white rounded-xl">
        <ModalCloser closeModal={() => setShowModal(false)} />
        <ProfileInfo {...userInfo} />
        <ButtonBox userId={userInfo.userId} />
      </div>
    </div>,
    $body
  );
}

export default ProfileModal;
