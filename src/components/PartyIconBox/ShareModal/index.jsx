import { useEffect, useState } from "react";
import closeIcon from "../../../assets/svg/x-modal-icon.svg";
import copyIcon from "../../../assets/svg/CopyIcon.svg";
import kakaoIcon from "../../../assets/images/kakaoIcon.png";

function ShareModal({ showModal, setShowModal }) {
  const [copyComplete, setCopyComplete] = useState(false);

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyComplete(true);
    });
  };

  useEffect(() => {
    if (!copyComplete) return;

    setTimeout(() => {
      setCopyComplete(false);
    }, 5000);
  }, [copyComplete]);

  useEffect(() => {
    if (showModal) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="relative h-44 whitespace-pre bg-white rounded-xl pl-7 pr-12 py-6">
          <p className="text-xl text-black font-bold">
            공유하기
            <span
              className={`text-sm font-normal ml-10 ${
                copyComplete ? "text-red-500" : "text-white"
              }`}
            >
              링크가 복사되었습니다!
            </span>
          </p>
          <img
            src={closeIcon}
            alt="close"
            className="absolute top-6 right-6 cursor-pointer rounded hover:bg-gray-200"
            onClick={() => setShowModal(false)}
          />

          <div className="mt-5 flex justify-between">
            <button
              className="bg-skyblue rounded-lg py-4 px-9 flex gap-4"
              onClick={copyURL}
            >
              <img src={copyIcon} alt="copy" />
              <span className="text-lg text-primary">링크 복사</span>
            </button>
            <button onClick={() => console.log("카카오")}>
              <img src={kakaoIcon} alt="kakao" className="w-16 h-16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
