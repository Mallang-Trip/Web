import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getUserInfo } from "../../api/users";
import ModalCloser from "./ModalCloser";
import ButtonBox from "./ButtonBox";
import ProfileInfo from "./ProfileInfo";
import Loading from "../Loading";

function ProfileModal({ showModal, setShowModal, userId = 0 }) {
  const modalRef = useRef();
  const $body = document.body;
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

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
  }, [showModal]);

  return createPortal(
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
      id="user-profile-modal"
    >
      <div className="m-auto shadow w-96 bg-white rounded-xl">
        <ModalCloser closeModal={() => setShowModal(false)} />
        {loading ? (
          <div className="w-full h-[344px] flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <ProfileInfo {...userInfo} />
            <ButtonBox userId={userInfo.userId} />
          </>
        )}
      </div>
    </div>,
    $body
  );
}

export default ProfileModal;
