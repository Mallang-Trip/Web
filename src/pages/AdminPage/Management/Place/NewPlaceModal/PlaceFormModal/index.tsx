import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { NewPlace } from "..";
import ImageInput from "./ImageInput";
import ImageItem from "./ImageItem";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  newPlaceInfo: NewPlace;
  setNewPlaceInfo: Dispatch<SetStateAction<NewPlace>>;
  submitNewPlace: () => void;
}

function PlaceFormModal({
  showModal,
  setShowModal,
  newPlaceInfo,
  setNewPlaceInfo,
  submitNewPlace,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) closeModal();
    },
    [modalRef]
  );

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");
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
      <div
        className={clsx(
          "mx-auto mt-auto md:my-auto shadow w-full max-w-[500px] rounded-xl md:translate-y-0 duration-700",
          showModal ? "translate-y-16" : "translate-y-full"
        )}
      >
        <div className="h-full bg-white rounded-t-xl max-h-[600px] relative">
          <div className="px-6 py-5">
            <p className="text-lg font-bold text-black mb-1">
              새로운 여행지 정보
            </p>
            <p className="text-sm font-medium text-boldgray">
              새로운 여행지의 정보를 확인해주세요.
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
          <div className="flex flex-col gap-3 pl-6 pr-4 pb-6 mx-auto h-full bg-white rounded-t-xl max-h-[500px] custom-scrollbar">
            <div>
              <div className="block mb-1 text-sm font-medium text-black">
                여행지 이름 <span className="text-red-600 font-bold">*</span>
              </div>
              <input
                type="text"
                name="place_name"
                className="bg-lightgray text-black text-sm rounded-lg focus:outline-none w-full h-12 px-2.5"
                placeholder="여행지 이름을 입력해 주세요"
                value={newPlaceInfo.name}
                onChange={(e) =>
                  setNewPlaceInfo({ ...newPlaceInfo, name: e.target.value })
                }
              />
            </div>
            <div>
              <div className="block mb-1 text-sm font-medium text-black">
                여행지 주소 <span className="text-red-600 font-bold">*</span>
              </div>
              <input
                type="text"
                name="place_address"
                className="bg-lightgray text-black text-sm rounded-lg focus:outline-none w-full h-12 px-2.5"
                placeholder="여행지 주소를 입력해 주세요"
                value={newPlaceInfo.address}
                onChange={(e) =>
                  setNewPlaceInfo({ ...newPlaceInfo, address: e.target.value })
                }
                disabled={true}
              />
            </div>
            <div>
              <div className="block mb-1 text-sm font-medium text-black">
                여행지 설명
              </div>
              <textarea
                name="place_content"
                className="bg-lightgray text-black text-sm rounded-lg focus:outline-none w-full h-24 p-2.5 resize-none overflow-hidden"
                placeholder="여행지 설명을 입력해 주세요"
                value={newPlaceInfo.content}
                onChange={(e) =>
                  setNewPlaceInfo({ ...newPlaceInfo, content: e.target.value })
                }
              />
            </div>
            <div>
              <div className="block mb-1 text-sm font-medium text-black">
                여행지 이미지
              </div>
              <div className="flex gap-4 custom-scrollbar">
                {newPlaceInfo.images.map((image, index) => (
                  <ImageItem
                    image={image}
                    newPlaceInfo={newPlaceInfo}
                    setNewPlaceInfo={setNewPlaceInfo}
                    index={index}
                    key={index}
                  />
                ))}
                {newPlaceInfo.images.length < 5 && (
                  <ImageInput
                    newPlaceInfo={newPlaceInfo}
                    setNewPlaceInfo={setNewPlaceInfo}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="block md:hidden w-full px-5 pb-5">
            <button
              className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
              onClick={submitNewPlace}
            >
              확인
            </button>
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
            onClick={submitNewPlace}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(PlaceFormModal);
