import { useEffect, useState } from "react";
import Region from "./Region";
import jeju from "../../../../../assets/images/제주도 이미지.jpg";
import gangwon from "../../../../../assets/images/강원도 이미지.jpg";
import uleng from "../../../../../assets/images/울릉도 이미지.jpg";
import jinhye from "../../../../../assets/images/진해.jpg";

const regionData = [
  {
    image: jeju,
    name: "제주도",
  },
  {
    image: gangwon,
    name: "강원도",
  },
  {
    image: uleng,
    name: "울릉도",
  },
  {
    image: jinhye,
    name: "진해",
  },
];

function RegionModal({ showModal, setShowModal, driverInfo, setDriverInfo }) {
  const [region, setRegion] = useState(driverInfo.region);

  const cancelHandler = () => {
    setShowModal(false);
  };

  const confirmHandler = () => {
    setDriverInfo({ ...driverInfo, region: region });
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
      setRegion(driverInfo.region);
    } else document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-gray-900 bg-opacity-50 scale-100 flex ${
        showModal && "active"
      }`}
    >
      <div className="relative w-full max-w-4xl max-h-full m-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => {
              setShowModal(false);
            }}
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
            <div className="grid grid-cols-2 gap-5 py-4 px-2 md:grid-cols-3 h-full bg-white rounded-xl overflow-auto">
              {regionData.map((item) => (
                <Region
                  key={item.name}
                  region={region}
                  image={item.image}
                  name={item.name}
                  setRegion={setRegion}
                />
              ))}
            </div>
            <div className="w-full px-2 mt-5 flex justify-between gap-5">
              <button
                className="w-full text-darkgray bg-white border border-darkgray font-medium rounded-lg px-5 py-2.5 text-center"
                onClick={cancelHandler}
              >
                취소
              </button>
              <button
                className="w-full text-white bg-primary border border-primary font-medium rounded-lg px-5 py-2.5 text-center"
                onClick={confirmHandler}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegionModal;
