import { useEffect, useRef } from "react";
import ModalCloser from "./ModalCloser";
import ButtonBox from "./ButtonBox";
import ProfileInfo from "./ProfileInfo";
import basicProfileImage from "../../assets/images/profileImage.png";

function ProfileModal({ showModal, setShowModal, name }) {
  const modalRef = useRef();

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="m-auto shadow w-96 bg-white rounded-xl">
        <ModalCloser closeModal={() => setShowModal(false)} />
        <ProfileInfo
          profileImage={basicProfileImage}
          name={name}
          introduction={"즐거운 여행 다녀요!"}
        />
        <ButtonBox />
      </div>
    </div>
  );
}

export default ProfileModal;
