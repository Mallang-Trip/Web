import { useEffect, useRef, useState } from "react";

function TelecomModal({ showModal, setShowModal, carrier, setCarrier }) {
  const modalRef = useRef();
  const [telecom, setTelecom] = useState("");

  const selectHandler = () => {
    if (!telecom) return;
    setCarrier(telecom);
    closeModal();
  };

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (carrier.slice(0, 4) !== "Mvno") setTelecom("");
  }, [carrier]);

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
        <div className="flex flex-col justify-center h-72 text-center whitespace-pre bg-white rounded-t-xl">
          <p className="text-lg text-black font-bold">
            알뜰폰 사업자를 선택해주세요
          </p>
          <div className="flex flex-col gap-2.5 mt-8 justify-center items-center">
            <button
              className={`w-64 h-11 text-sm border rounded-lg ${
                telecom === "MvnoSKT"
                  ? "border-primary text-primary bg-skyblue"
                  : "border-darkgray text-darkgray bg-lightgray"
              }`}
              onClick={() => setTelecom("MvnoSKT")}
            >
              SKT
            </button>
            <button
              className={`w-64 h-11 text-sm border rounded-lg ${
                telecom === "MvnoKT"
                  ? "border-primary text-primary bg-skyblue"
                  : "border-darkgray text-darkgray bg-lightgray"
              }`}
              onClick={() => setTelecom("MvnoKT")}
            >
              KT
            </button>
            <button
              className={`w-64 h-11 text-sm border rounded-lg ${
                telecom === "MvnoLGT"
                  ? "border-primary text-primary bg-skyblue"
                  : "border-darkgray text-darkgray bg-lightgray"
              }`}
              onClick={() => setTelecom("MvnoLGT")}
            >
              LG U+
            </button>
          </div>
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={selectHandler}
          >
            선택
          </button>
        </div>
      </div>
    </div>
  );
}

export default TelecomModal;
