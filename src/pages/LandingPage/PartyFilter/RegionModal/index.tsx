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
import { setRegion } from "../../../../redux/modules/partyFilterSlice";
import { getPartyRegionList } from "../../../../api/region";
import { RootState } from "../../../../redux/store";
import RegionButton from "./RegionButton";
import clsx from "clsx";

interface RegionType {
  image: string;
  name: string;
  province: string | null;
  regionId: number;
}

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowKakaoChatModal: Dispatch<SetStateAction<boolean>>;
}

function RegionModal({
  showModal,
  setShowModal,
  setShowKakaoChatModal,
}: Props) {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const region = useSelector((state: RootState) => state.partyFilter.region);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regionData, setRegionData] = useState<RegionType[]>([]);

  const regionClickHandler = useCallback((target: string) => {
    setShowModal(false);
    if (target.includes("그 외")) {
      setShowKakaoChatModal(true);
      return;
    }
    dispatch(setRegion(target));
  }, []);

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

  const getPartyRegionListFunc = useCallback(async () => {
    try {
      const result = await getPartyRegionList();
      setRegionData(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setSelectedRegion(region);

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  useEffect(() => {
    getPartyRegionListFunc();
  }, []);

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
          "mx-auto mt-auto md:my-auto shadow w-full max-w-[700px] rounded-xl md:translate-y-0 duration-500",
          showModal ? "translate-y-16" : "translate-y-full"
        )}
      >
        <div className="h-full bg-white rounded-t-xl max-h-[600px] relative">
          <div className="px-6 py-5">
            <p className="text-lg font-bold text-black mb-1">목적지</p>
            <p className="text-sm font-medium text-boldgray">
              원하는 목적지를 선택해주세요.
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
          <div className="grid grid-cols-2 gap-10 px-6 mx-auto sm:grid-cols-3 h-full bg-white rounded-t-xl max-h-[400px] md:max-h-[500px] custom-scrollbar">
            {regionData.map((item) => (
              <RegionButton
                key={item.regionId}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                {...item}
              />
            ))}
          </div>
          <div className="block md:hidden w-full p-5">
            <button
              className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
              onClick={() => regionClickHandler(selectedRegion)}
            >
              확인
            </button>
          </div>
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={() => regionClickHandler("모든 지역")}
          >
            모든 지역
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={() => regionClickHandler(selectedRegion)}
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(RegionModal);
