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
import { getPartyRegionList } from "../../../../../api/region";
import { DriverInfo } from "../../../../../types";
import Region from "./Region";
import clsx from "clsx";

interface RegionData {
  image: string;
  name: string;
  province: string | null;
  regionId: number;
}

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  driverInfo: DriverInfo;
  setDriverInfo: Dispatch<SetStateAction<DriverInfo>>;
}

function RegionModal({
  showModal,
  setShowModal,
  driverInfo,
  setDriverInfo,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);
  const [region, setRegion] = useState(driverInfo.region);
  const [regionData, setRegionData] = useState<RegionData[]>([]);

  const getPartyRegionListFunc = useCallback(async () => {
    try {
      const result = await getPartyRegionList();
      setRegionData(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const cancelHandler = useCallback(() => setShowModal(false), []);

  const confirmHandler = useCallback(() => {
    setDriverInfo({ ...driverInfo, region });
    setShowModal(false);
  }, [driverInfo, region]);

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

    setRegion(driverInfo.region);

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  useEffect(() => {
    setDriverInfo({ ...driverInfo, region });
  }, [region]);

  useEffect(() => {
    getPartyRegionListFunc();
  }, []);

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
              활동 가능한 지역 수정하기
            </h3>
            <div className="grid grid-cols-2 gap-5 mt-8 px-2 md:grid-cols-3 h-full max-h-[600px] bg-white rounded-xl custom-scrollbar">
              {regionData.map((item) => (
                <Region
                  key={item.regionId}
                  region={region}
                  image={item.image}
                  name={item.name}
                  setRegion={setRegion}
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

export default memo(RegionModal);
