import { useEffect, useRef, useState } from "react";

function ImageModal({ showModal, setShowModal, sendImageHandler }) {
  const modalRef = useRef();
  const imageRef = useRef();
  const [image, setImage] = useState(undefined);

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  const imageHandler = () => {
    const imageFile = imageRef.current.files[0];
    setImage(imageFile || undefined);
  };

  useEffect(() => {
    setImage(undefined);

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={`modal-container absolute top-0 left-0 z-50 w-full h-full bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="h-80 bg-white rounded-t-xl pt-5 px-6">
          <p className="text-xl text-black font-bold">사진 전송</p>

          <div className="flex justify-center w-full h-[200px] mt-8 mb-16 relative">
            <div
              className="w-[300px] h-[200px] bg-[#EAF4FF] border border-dashed border-primary rounded-2xl cursor-pointer"
              onClick={() => imageRef.current.click()}
            >
              {image && (
                <img
                  className="object-cover w-full h-full rounded-2xl"
                  src={URL.createObjectURL(image)}
                  alt="chat_Image"
                />
              )}
            </div>
            <input
              ref={imageRef}
              className="hidden"
              id="chatImage_input"
              type="file"
              accept="image/*"
              onChange={imageHandler}
            />
          </div>
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-[#F4F4F4]"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={() => sendImageHandler(image)}
          >
            사진 전송하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
