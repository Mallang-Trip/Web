import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import closeIcon from "../../../assets/svg/x-modal-icon.svg";
import copyIcon from "../../../assets/svg/CopyIcon.svg";
import kakaoIcon from "../../../assets/images/kakaoIcon.png";
import basicProfileImage from "../../../assets/images/profileImage.png";

function ShareModal({ showModal, setShowModal, partyImages, partyName }) {
  const Kakao = window.Kakao;
  const modalRef = useRef();
  const { partyId } = useParams();
  const user = useSelector((state) => state.user);
  const [copyComplete, setCopyComplete] = useState(false);

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyComplete(true);
    });
  };

  if (!Kakao.isInitialized()) {
    Kakao.init("19c42824783a3e9124e67b70847e0ec6");
  }

  const kakaoShare = () => {
    Kakao.Share.sendCustom({
      templateId: 99453,
      templateArgs: {
        PARTY_IMAGE1: partyImages[0],
        PARTY_IMAGE2: partyImages[1] || partyImages[0],
        PARTY_IMAGE3: partyImages[2] || partyImages[0],
        PROFILE_IMAGE: user.profileImg || basicProfileImage,
        PROFILE_NAME: user.nickname || "말랑트립",
        PARTY_NAME: partyName,
        PARTY_ID: partyId,
      },
    });
  };

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (!copyComplete) return;

    setTimeout(() => {
      setCopyComplete(false);
    }, 5000);
  }, [copyComplete]);

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
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="relative h-44 whitespace-pre bg-white rounded-xl pl-7 pr-12 py-6">
          <p className="text-xl text-black font-bold">
            공유하기
            <span
              className={`text-sm font-normal ml-10 ${
                copyComplete ? "text-red-600" : "text-white"
              }`}
            >
              링크가 복사되었습니다!
            </span>
          </p>
          <img
            src={closeIcon}
            alt="close"
            className="absolute top-6 right-6 cursor-pointer rounded hover:bg-gray-200"
            onClick={closeModal}
          />

          <div className="mt-5 flex justify-between">
            <button
              className="bg-skyblue rounded-lg py-4 px-9 flex gap-4"
              onClick={copyURL}
            >
              <img src={copyIcon} alt="copy" />
              <span className="text-lg text-primary">링크 복사</span>
            </button>
            <button onClick={kakaoShare}>
              <img src={kakaoIcon} alt="kakao" className="w-16 h-16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
