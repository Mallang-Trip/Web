import { useEffect } from "react";

function CheckModal({
  showModal,
  setShowModal,
  message,
  noText,
  yesText,
  yesHandler,
}) {
  const closeModal = () => {
    document.body.classList.remove("overflow-hidden");
    setShowModal(false);
  };

  useEffect(() => {
    if (!showModal) return;
    document.body.classList.add("overflow-hidden");
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          {message}
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-[#F4F4F4]"
            onClick={closeModal}
          >
            {noText}
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={yesHandler}
          >
            {yesText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckModal;
