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
import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "../../../../redux/modules/partyFilterSlice";
import { RootState } from "../../../../redux/store";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function PriceModal({ showModal, setShowModal }: Props) {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const price = useSelector((state: RootState) => state.partyFilter.price);
  const [modalPrice, setModalPrice] = useState(310000);

  const closeModal = useCallback(() => {
    dispatch(setPrice(modalPrice));
    setShowModal(false);
  }, [modalPrice]);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) setShowModal(false);
    },
    [modalRef]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowModal(false);
      else if (event.key === "Enter") buttonRef.current?.click();
    },
    [buttonRef]
  );

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    const numPrice = typeof price === "string" ? parseInt(price) : price;
    setModalPrice(numPrice);

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
      <div
        className={clsx(
          "mx-auto mt-auto md:my-auto shadow w-full md:w-96 rounded-xl duration-500 md:translate-y-0",
          showModal ? "translate-y-16" : "translate-y-full"
        )}
      >
        <div className="w-full h-80 md:h-64 text-center bg-white rounded-t-xl relative">
          <div className="absolute top-0 left-0 text-left px-6 pt-5">
            <p className="text-lg font-bold text-black mb-1">
              1인당 가격 범위 설정
            </p>
            <p className="text-sm font-medium text-boldgray">
              1인당 최대 가격을 설정해주세요.
            </p>
          </div>
          <button
            type="button"
            className="absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center z-10"
            onClick={() => setShowModal(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="w-full h-full pt-20 pb-20 md:pb-0 flex flex-col justify-center gap-10 relative">
            <div className="px-12">
              <div className="w-full h-6 relative flex items-center mb-1.5">
                <div className="w-full h-2 rounded-full bg-mediumgray relative">
                  <div
                    className="h-2 rounded-full bg-primary absolute top-0 left-0"
                    style={{ width: `${modalPrice / 3100}%` }}
                  />
                </div>
                <input
                  className="absolute w-full h-6 bg-transparent slider z-20 top-0 left-0 focus:outline-none"
                  type="range"
                  min={0}
                  max={310000}
                  step={10000}
                  name="modalPrice"
                  value={modalPrice}
                  onChange={(e) => setModalPrice(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="text-xl text-primary">
              {modalPrice > 300000
                ? "모든 가격"
                : `최대 ${modalPrice / 10000}만원`}
            </div>
            <div className="absolute bottom-0 left-0 block md:hidden w-full p-5">
              <button
                className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
                onClick={closeModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
        <button
          className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
          onClick={closeModal}
          ref={buttonRef}
        >
          확인
        </button>
      </div>
    </div>,
    document.body
  );
}

export default memo(PriceModal);
