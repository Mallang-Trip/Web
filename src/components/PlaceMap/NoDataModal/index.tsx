import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  searchPage: boolean;
  setShowNewPlaceModal: Dispatch<SetStateAction<boolean>>;
}

function NoDataModal({
  showModal,
  setShowModal,
  searchPage,
  setShowNewPlaceModal,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    ({ target }: MouseEvent) => {
      if (modalRef.current === target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback(({ key }: KeyboardEvent) => {
    if (key === "Escape") closeModal();
  }, []);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

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
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          {searchPage
            ? "말랑트립 여행지로 아직 등록이 되어 있지 않습니다.\n파티에 가입할 때 직접 만들어주세요!"
            : "말랑트립 여행지로 아직 등록이 되어 있지 않습니다.\n새로운 여행지로 추가하시겠습니까?"}
        </div>
        {!searchPage ? (
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
                setShowNewPlaceModal(true);
                closeModal();
              }}
            >
              확인
            </button>
          </div>
        ) : (
          <button
            className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
            onClick={closeModal}
          >
            확인
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}

export default memo(NoDataModal);
