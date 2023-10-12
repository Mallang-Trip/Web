import { useEffect } from "react";
import ModalCloser from "./ModalCloser";
import ProfileImage from "../../../../assets/images/profileImage.png";
import ButtonBox from "./ButtonBox";
import ProfileInfo from "./ProfileInfo";

function ProfileModal({ showModal, setShowModal, name }) {
  const closeModal = () => {
    document.body.classList.remove("overflow-hidden");
    setShowModal(false);
  };

  useEffect(() => {
    if (!showModal) return;
    document.body.classList.add("overflow-hidden");
  }, [showModal]);

  useEffect(() => {
    return () => closeModal();
  }, []);

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
    >
      <div className="m-auto shadow w-96 bg-white rounded-xl">
        <ModalCloser closeModal={closeModal} />
        <ProfileInfo
          profileImage={ProfileImage}
          name={name}
          introduction={"즐거운 여행 다녀요!"}
        />
        <ButtonBox />
      </div>
    </div>
  );
}

export default ProfileModal;
