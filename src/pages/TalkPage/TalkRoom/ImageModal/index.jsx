import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CONSTANT } from "../../../../utils/data";
import Loading from "../../../../components/Loading";

function ImageModal({
  showModal,
  setShowModal,
  sendImageHandler,
  sendImageLoading,
}) {
  const modalRef = useRef();
  const imageRef = useRef();
  const $body = document.body;
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
    if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    setImage(imageFile || undefined);
  };

  useEffect(() => {
    setImage(undefined);

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
    >
      <div className="m-auto shadow w-96 bg-white rounded-xl">
        <div className="h-80 bg-white rounded-t-xl pt-5 px-6">
          <p className="text-xl text-black font-bold">사진 전송</p>
          <div className="flex justify-center w-full h-[200px] mt-8 mb-16 relative">
            {sendImageLoading ? (
              <Loading />
            ) : (
              <div
                className="w-[300px] h-[200px] bg-skyblue border border-dashed border-primary rounded-2xl cursor-pointer"
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
            )}
            {showModal && (
              <input
                ref={imageRef}
                className="hidden"
                id="chatImage_input"
                type="file"
                accept="image/*"
                onChange={imageHandler}
              />
            )}
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
            onClick={() => {
              if (sendImageLoading) return;
              sendImageHandler(image);
            }}
          >
            사진 전송하기
          </button>
        </div>
      </div>
    </div>,
    $body
  );
}

export default ImageModal;
