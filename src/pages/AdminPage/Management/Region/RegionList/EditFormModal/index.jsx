import { useEffect, useRef, useState } from "react";
import { putPartyRegion } from "../../../../../../api/region";
import { uploadImage } from "../../../../../../api/image";
import { CONSTANT } from "../../../../../../utils/data";

function EditFormModal({
  showModal,
  setShowModal,
  editTarget,
  getPartyRegionListFunc,
}) {
  const modalRef = useRef();
  const imageRef = useRef();
  const [region, setRegion] = useState("");
  const [regionImg, setRegionImg] = useState(undefined);

  const submitEditRegion = async () => {
    if (!region) return alert("지역 이름을 입력해주세요.");
    if (!regionImg) return alert("지역 사진을 입력해주세요.");

    try {
      const regionImgURL =
        typeof regionImg === "string"
          ? regionImg
          : await uploadImage(regionImg);
      const body = {
        name: region,
        image: regionImgURL,
      };

      await putPartyRegion(editTarget.partyRegionId, body);
      alert("지역이 정상적으로 편집되었습니다.");
      setShowModal(false);
      getPartyRegionListFunc();
    } catch (e) {
      console.log(e);
      alert("지역 편집에 실패했습니다.");
    }
  };

  const imageUploadHandler = () => {
    const imageFile = imageRef.current.files[0];
    if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    setRegionImg(imageFile);
  };

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setRegion(editTarget?.region);
    setRegionImg(editTarget?.regionImg);
  }, [showModal, editTarget]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div
        className={`mx-auto mt-auto md:my-auto shadow w-full max-w-[500px] rounded-xl md:translate-y-0 duration-700 ${
          showModal ? "translate-y-16" : "translate-y-full"
        }`}
      >
        <div className="h-full bg-white rounded-t-xl max-h-[600px] relative">
          <div className="px-6 py-5">
            <p className="text-lg font-bold text-black mb-1">지역 편집</p>
            <p className="text-sm font-medium text-boldgray">
              편집할 지역의 이름과 사진을 확인해주세요.
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
          <div className="flex flex-col gap-3 px-6 pb-6 mx-auto h-full bg-white rounded-t-xl max-h-[500px] overflow-auto noScrollBar">
            <div>
              <div className="block mb-1 text-sm font-medium text-black">
                지역 이름 <span className="text-red-600 font-bold">*</span>
              </div>
              <input
                type="text"
                name="region_name"
                className="bg-lightgray text-black text-sm rounded-lg focus:outline-none w-full h-12 px-2.5"
                placeholder="지역 이름을 입력해 주세요"
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
                onClick={() => imageRef.current.click()}
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
              <input
                ref={imageRef}
                className="hidden"
                id="regionImage_input"
                type="file"
                accept="image/*"
                onChange={imageUploadHandler}
              />
            </div>
          </div>
          <div className="block md:hidden w-full px-5 pb-5">
            <button
              className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
              onClick={submitEditRegion}
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
            onClick={submitEditRegion}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditFormModal;
