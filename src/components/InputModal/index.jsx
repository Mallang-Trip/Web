import { useEffect, useRef, useState } from "react";

function InputModal({
  showModal,
  setShowModal,
  titleMessage,
  subMessage,
  placeholder,
  noText,
  yesText,
  yesHandler,
}) {
  const modalRef = useRef();
  const [data, setData] = useState("");

  const closeModal = () => setShowModal(false);

  const handleInput = (e) => {
    setData(e.target.value);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
    else if (event.key === "Enter") yesHandler(data);
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setData(placeholder);

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
        <div className="flex flex-col justify-center text-center text-[#1C1B1F] whitespace-pre bg-white rounded-t-xl text-xl font-bold pt-16 pb-8">
          {titleMessage}
          <div className="mt-2 text-gray500 text-sm font-medium">
            {subMessage}
          </div>
        </div>
        <div className="flex items-center justify-center bg-white">
          <input
            className="w-4/5 h-12 rounded-xl outline-0 text-gray700 bg-lightgray font-semibold text-sm text-center mb-12"
            placeholder={placeholder}
            value={data}
            onChange={handleInput}
          />
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={closeModal}
          >
            {noText}
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={() => yesHandler(data)}
          >
            {yesText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputModal;
