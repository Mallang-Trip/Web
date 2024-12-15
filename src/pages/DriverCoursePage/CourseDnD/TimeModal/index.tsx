import clsx from "clsx";
import {
  ChangeEvent,
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
}

function TimeModal({
  showModal,
  setShowModal,
  startTime,
  setStartTime,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("00");

  const hourHander = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) return;
    const newHour = e.target.value.replace(/\D/g, "");
    if (parseInt(newHour) < 0 || parseInt(newHour) > 24) return;
    setHour(newHour);
  }, []);

  const minuteHander = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) return;
    const newMinute = e.target.value.replace(/\D/g, "");
    if (parseInt(newMinute) < 0 || parseInt(newMinute) >= 60) return;
    setMinute(newMinute);
  }, []);

  const changeHandler = useCallback(() => {
    setStartTime(
      String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0")
    );
    closeModal();
  }, [hour, minute]);

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

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setHour(startTime.slice(0, 2));
    setMinute(startTime.slice(3));

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center gap-10 h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          <p className="text-xl font-bold">출발 시간을 설정해주세요.</p>
          <div className="flex justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="startTime_hour"
                className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-14 p-2.5 text-center"
                placeholder="10"
                value={hour}
                onChange={hourHander}
              />
              <span>시</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="startTime_minute"
                className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-14 p-2.5 text-center"
                placeholder="00"
                value={minute}
                onChange={minuteHander}
              />
              <span>분</span>
            </div>
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
            onClick={changeHandler}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(TimeModal);
