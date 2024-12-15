import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { onlyNumber } from "../../../utils";
import { uploadImage } from "../../../api/image";
import CarImage from "./CarImage";
import primaryPlus from "../../../assets/svg/primary_plus.svg";
import InputImage from "../../../components/InputImage";

interface Props {
  setActiveNext: Dispatch<SetStateAction<boolean>>;
  carImages: string[] | null;
  setCarImages: Dispatch<SetStateAction<string[] | null>>;
  modelName: string;
  setModelName: Dispatch<SetStateAction<string>>;
  vehicleNumber: string;
  setVehicleNumber: Dispatch<SetStateAction<string>>;
  maxNum: string;
  setMaxNum: Dispatch<SetStateAction<string>>;
}

function CarInfo({
  setActiveNext,
  carImages,
  setCarImages,
  modelName,
  setModelName,
  vehicleNumber,
  setVehicleNumber,
  maxNum,
  setMaxNum,
}: Props) {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const imageHandler = useCallback(async () => {
    if (
      imageRef.current &&
      imageRef.current.files &&
      imageRef.current.files[0]
    ) {
      const imageFile = imageRef.current.files[0];
      if (!imageFile) setCarImages(null);
      const uploadedImage = await uploadImage(imageFile);
      setCarImages((carImages) =>
        Array.isArray(carImages)
          ? [...carImages, uploadedImage]
          : [uploadedImage]
      );
    }
  }, [imageRef]);

  useEffect(() => {
    if (
      carImages &&
      carImages.length > 0 &&
      modelName &&
      vehicleNumber &&
      onlyNumber(maxNum)
    )
      setActiveNext(true);
    else setActiveNext(false);
  }, [carImages, modelName, vehicleNumber, maxNum]);

  return (
    <div className="w-full md:w-3/4 mx-auto flex flex-col gap-8">
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          차량의 사진을 업로드해주세요{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <div className="flex w-full h-[200px] mt-4 mb-16 relative gap-2 custom-scrollbar">
          <div className="flex gap-2 flex-shrink-0">
            <div
              className="w-[300px] h-full bg-skyblue border border-dashed border-primary rounded-2xl cursor-pointer justify-center items-center flex"
              onClick={() => imageRef.current?.click()}
            >
              <img src={primaryPlus} alt="plus" className="w-4 h-4" />
              <InputImage
                inputRef={imageRef}
                className="hidden"
                id="carImage_input"
                onChange={imageHandler}
              />
            </div>
            {carImages && carImages.length > 0 ? (
              <div className="flex flex-col flex-wrap gap-2">
                {carImages.map((image, index) => (
                  <CarImage
                    key={index}
                    image={image}
                    index={index}
                    carImages={carImages}
                    setCarImages={setCarImages}
                  />
                ))}
              </div>
            ) : null}
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
          차량 번호를 입력해주세요{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="text"
          id="vehicle_number"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="차량 번호"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
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

export default memo(CarInfo);
