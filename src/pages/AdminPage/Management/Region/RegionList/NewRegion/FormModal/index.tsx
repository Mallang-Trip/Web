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
import { postNewPartyRegion } from "../../../../../../../api/region";
import { uploadImage } from "../../../../../../../api/image";
import InputImage from "../../../../../../../components/InputImage";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  getPartyRegionListFunc: () => void;
}

function FormModal({ showModal, setShowModal, getPartyRegionListFunc }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [region, setRegion] = useState("");
  const [regionImg, setRegionImg] = useState<string | File | undefined>(
    undefined
  );

  const submitNewRegion = useCallback(async () => {
    if (!region) return alert("지역 이름을 입력해주세요.");
    if (!regionImg) return alert("지역 사진을 입력해주세요.");

    try {
      const regionImgURL = await uploadImage(regionImg);
      const body = {
        name: region,
        image: regionImgURL,
      };

      await postNewPartyRegion(body);
      alert("새로운 지역이 정상적으로 추가되었습니다.");
      setShowModal(false);
      getPartyRegionListFunc();
    } catch (e) {
      console.log(e);
      alert("새로운 지역 추가에 실패했습니다.");
    }
  }, [region, regionImg]);

  const imageUploadHandler = useCallback(() => {
    if (
      imageRef.current &&
      imageRef.current.files &&
      imageRef.current.files[0]
    ) {
      const imageFile = imageRef.current.files[0];
      setRegionImg(imageFile);
    }
  }, [imageRef]);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) closeModal();
    },
    [modalRef]
  );

  useEffect(() => {
    if (!showModal) {
      if (imageRef.current) imageRef.current.value = "";
      document.body.classList.remove("overflow-hidden");
      return;
    }
    document.body.classList.add("overflow-hidden");

    setRegion("");
    setRegionImg(undefined);
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
              새로운 지역 추가
            </p>
            <p className="text-sm font-medium text-boldgray">
              새로운 지역의 이름과 사진을 등록해주세요.
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
          <div className="flex flex-col gap-3 px-6 pb-6 mx-auto h-full bg-white rounded-t-xl max-h-[500px] custom-scrollbar">
            <div>
              <div className="block mb-1 text-sm font-medium text-black">
                지역 이름 <span className="text-red-600 font-bold">*</span>
              </div>
              <input
                type="text"
                name="region_name"
                className="bg-lightgray text-black text-sm rounded-lg focus:outline-none w-full h-12 px-2.5"
                placeholder="지역 이름을 입력해 주세요 (ex.수원)"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
            <div>
              <div className="block mb-1 text-sm font-medium text-black">
                지역 사진 <span className="text-red-600 font-bold">*</span>
              </div>
              <div
                className="shrink-0 w-full h-60 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
                onClick={() => imageRef.current?.click()}
              >
                {regionImg && (
                  <img
                    src={
                      typeof regionImg === "string"
                        ? regionImg
                        : URL.createObjectURL(regionImg)
                    }
                    alt="region_image"
                    className="object-cover w-full h-full rounded-lg"
                  />
                )}
              </div>
              <InputImage
                inputRef={imageRef}
                className="hidden"
                id="regionImage_input"
                onChange={imageUploadHandler}
              />
            </div>
          </div>
          <div className="block md:hidden w-full px-5 pb-5">
            <button
              className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
              onClick={submitNewRegion}
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
            onClick={submitNewRegion}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(FormModal);
