import { useEffect, useRef } from "react";
import { onlyNumber } from "../../../utils";
import { uploadImage } from "../../../api/image";
import { CONSTANT } from "../../../utils/data";

function CarInfo({
  setActiveNext,
  carImages,
  setCarImages,
  modelName,
  setModelName,
  maxNum,
  setMaxNum,
}) {
  const imageRef = useRef();

  const imageHandler = async () => {
    const imageFile = imageRef.current.files[0];
    if (!imageFile) setCarImages(null);
    else if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    else
      setCarImages(
        await Promise.all(
          carImages.map((image) =>
            typeof image === "string" ? image : uploadImage(image)
          )
        )
      );
  };

  useEffect(() => {
    if (carImages && carImages.length > 0 && modelName && onlyNumber(maxNum))
      setActiveNext(true);
    else setActiveNext(false);
  }, [carImages, modelName, maxNum]);

  return (
    <div className="w-full md:w-3/4 mx-auto flex flex-col gap-8">
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          차량의 사진을 업로드해주세요{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <div className="flex justify-center w-full h-[200px] mt-4 mb-16 relative">
          <div
            className="w-[300px] h-[200px] bg-skyblue border border-dashed border-primary rounded-2xl cursor-pointer"
            onClick={() => imageRef.current.click()}
          >
            {carImages && carImages.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {carImages.map((image, index) => (
                  <img
                    key={index}
                    className="object-cover w-full h-full rounded-2xl"
                    src={URL.createObjectURL(image)}
                    alt={`car_Image_${index}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 md:translate-x-[200px] md:translate-y-0">
            <label htmlFor="carImage_input">
              <button
                className="px-5 py-1 text-sm bg-white border rounded-full border-darkgray text-darkgray"
                onClick={() => imageRef.current.click()}
              >
                사진 업로드
              </button>
            </label>
            <input
              ref={imageRef}
              className="hidden"
              id="carImage_input"
              type="file"
              accept="image/*"
              onChange={imageHandler}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          차량의 모델 이름을 입력해주세요{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="text"
          id="model_name"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="차량의 모델 이름"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          autoComplete="off"
        />
      </div>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          승객들의 최대 탑승 가능 정원을 입력해주세요{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="text"
          id="max_num"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="승객들의 최대 탑승 가능 정원"
          value={maxNum}
          onChange={(e) => setMaxNum(onlyNumber(e.target.value))}
          autoComplete="off"
        />
        <p className="mt-2 text-xs text-red-600 font-medium">
          숫자만 입력 가능합니다.
        </p>
      </div>
    </div>
  );
}

export default CarInfo;
