import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Loading from "../../../../components/Loading";
import InputImage from "../../../../components/InputImage";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  sendImageHandler: (image: File) => void;
  sendImageLoading: boolean;
}

function ImageModal({
  showModal,
  setShowModal,
  sendImageHandler,
  sendImageLoading,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | undefined>(undefined);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") closeModal();
  }, []);

  const imageHandler = useCallback(() => {
    if (imageRef.current && imageRef.current.files) {
      const imageFile = imageRef.current.files[0];
      setImage(imageFile || undefined);
    }
  }, [imageRef]);

  useEffect(() => {
    setImage(undefined);

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return createPortal(
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div className="m-auto shadow w-96 bg-white rounded-xl">
        <div className="h-80 bg-white rounded-t-xl pt-5 px-6">
          <p className="text-xl text-black font-bold">사진 전송</p>
          <div className="flex justify-center w-full h-[200px] mt-8 mb-16 relative">
            {sendImageLoading ? (
              <Loading full={false} />
            ) : (
              <div
                className="w-[300px] h-[200px] bg-skyblue border border-dashed border-primary rounded-2xl cursor-pointer"
                onClick={() => imageRef.current?.click()}
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
              <InputImage
                id="chatImage_input"
                inputRef={imageRef}
                className="hidden"
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
              if (sendImageLoading || !image) return;
              sendImageHandler(image);
            }}
          >
            사진 전송하기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(ImageModal);
