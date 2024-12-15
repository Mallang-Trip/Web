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
import { RootState } from "../../../../redux/store";
import { setNowDate } from "../../../../redux/modules/partyFilterSlice";
import Calendar from "react-calendar";
import clsx from "clsx";
import "./index.css";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function DateModal({ showModal, setShowModal }: Props) {
  const dispatch = useDispatch();
  const nowDate = useSelector((state: RootState) => state.partyFilter.nowDate);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);
  const [date, setDate] = useState<any>(nowDate);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) closeModal();
    },
    [modalRef]
  );

  const allDateHandler = useCallback(() => {
    setDate([]);
    dispatch(setNowDate([]));
    setShowModal(false);
  }, []);

  const confirmHandler = useCallback(() => {
    dispatch(setNowDate(date));
    setShowModal(false);
  }, [date]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      else if (event.key === "Enter") confirmButtonRef.current?.click();
    },
    [confirmButtonRef]
  );

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setDate(nowDate);

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
          "mx-auto mt-auto md:my-auto rounded-xl bg-white relative md:translate-y-0 duration-500",
          showModal ? "translate-y-16" : "translate-y-full"
        )}
      >
        <div className="px-6 pt-5">
          <p className="text-lg font-bold text-black mb-1">가능한 일정</p>
          <p className="text-sm font-medium text-boldgray">
            가능한 일정을 범위로 선택해주세요.
          </p>
        </div>
        <button
          type="button"
          className="absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          onClick={closeModal}
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
        <Calendar
          onChange={setDate}
          value={date}
          formatDay={(_, date) => date.toLocaleString("en", { day: "numeric" })}
          minDate={new Date()}
          selectRange={true}
          calendarType="gregory"
          className="border border-white rounded-t-xl"
        />
        <div className="block md:hidden w-full p-5">
          <button
            className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
            onClick={confirmHandler}
          >
            확인
          </button>
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={allDateHandler}
          >
            모든 날짜
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={confirmHandler}
            ref={confirmButtonRef}
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(DateModal);
