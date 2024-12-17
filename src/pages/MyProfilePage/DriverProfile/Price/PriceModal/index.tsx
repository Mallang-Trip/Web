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
import { DriverInfo } from "@/types";
import HourPrice from "@/pages/DriverApplyPage/Accout/HourPrice";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  driverInfo: DriverInfo;
  setDriverInfo: Dispatch<SetStateAction<DriverInfo>>;
}

function PriceModal({
  showModal,
  setShowModal,
  driverInfo,
  setDriverInfo,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);
  const [hour, setHour] = useState<string[]>([]);
  const [money, setMoney] = useState<string[]>([]);

  const cancelHandler = useCallback(() => setShowModal(false), []);

  const confirmHandler = useCallback(() => {
    const prices = [];
    for (let i = 0; i < 10; i++) {
      if (hour[i] && money[i])
        prices.push({
          hours: Number(hour[i]),
          price: parseFloat(money[i].replace(/,/g, "")),
        });
    }

    setDriverInfo({
      ...driverInfo,
      prices: prices,
    });
    setShowModal(false);
  }, [hour, money, driverInfo]);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) cancelHandler();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") cancelHandler();
      else if (event.key === "Enter") confirmButtonRef.current?.click();
    },
    [confirmButtonRef]
  );

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    const basicHour = ["", "", "", "", "", "", "", "", "", ""];
    const basicMoney = ["", "", "", "", "", "", "", "", "", ""];
    driverInfo.prices.forEach((item, index) => {
      basicHour[index] = item.hours.toString();
      basicMoney[index] = item.price.toString();
    });
    setHour(basicHour);
    setMoney(basicMoney);

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div className="relative w-full max-w-4xl max-h-full m-auto">
        <div className="relative bg-white rounded-t-lg">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={cancelHandler}
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
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              가격 설정하기
            </h3>
            <div className="h-96 my-9 mx-auto px-2 lg:px-24 custom-scrollbar">
              {hour.map((item, index) => (
                <HourPrice
                  key={index}
                  hour={hour}
                  setHour={setHour}
                  money={money}
                  setMoney={setMoney}
                  index={index}
                  isShow={item !== ""}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-lg bg-lightgray"
            onClick={cancelHandler}
          >
            취소
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-lg bg-primary"
            onClick={confirmHandler}
            ref={confirmButtonRef}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(PriceModal);
