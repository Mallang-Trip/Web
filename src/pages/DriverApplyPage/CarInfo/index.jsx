import { useEffect, useRef } from "react";
import { onlyNumber } from "../../../utils";

function CarInfo({
  setActiveNext,
  carImage,
  setCarImage,
  modelName,
  setModelName,
  maxNum,
  setMaxNum,
}) {
  const imageRef = useRef();

  const imageHandler = () => {
    const imageFile = imageRef.current.files[0];
    setCarImage(imageFile || undefined);
  };

  useEffect(() => {
    if (carImage && modelName && onlyNumber(maxNum)) setActiveNext(true);
    else setActiveNext(false);
  }, [carImage, modelName, maxNum]);

  return (
    <div className="mx-10">
      <p className="text-lg text-black">차량의 사진을 업로드해주세요</p>

      <div className="flex justify-center w-full h-[200px] mt-8 mb-16 relative">
        <div
          className="w-[300px] h-[200px] bg-[#EAF4FF] border border-dashed border-primary rounded-2xl cursor-pointer"
          onClick={() => imageRef.current.click()}
        >
          {carImage && (
            <img
              className="object-cover w-full h-full rounded-2xl"
              src={URL.createObjectURL(carImage)}
              alt="car_Image"
            />
          )}
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
      <div className="w-full md:w-3/4 mx-auto">
        <input
          type="text"
          name="model_name"
          placeholder="차량의 모델 이름을 입력해주세요"
          className="w-full mb-12 border-b border-darkgray focus:outline-none focus:border-primary"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          name="max_num"
          placeholder="승객들의 최대 탑승 가능 정원을 입력해주세요"
          className="w-full border-b border-darkgray focus:outline-none focus:border-primary"
          value={maxNum}
          onChange={(e) => setMaxNum(onlyNumber(e.target.value))}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default CarInfo;
