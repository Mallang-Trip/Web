import { useState } from "react";
import { priceToString } from "../../../../utils";
import PriceInfo from "./PriceInfo";
import PriceModal from "./PriceModal";

function Price({ modifyMode, driverInfo, setDriverInfo }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">가격 설정</p>
      <div className="grid grid-cols-2 gap-3">
        {driverInfo.prices.map((price) => (
          <PriceInfo
            key={price.hours + price.price}
            content={`${price.hours}시간당 ${priceToString(price.price)}원`}
            modifyMode={modifyMode}
            setShowModal={setShowModal}
          />
        ))}
      </div>
      <PriceModal
        showModal={showModal}
        setShowModal={setShowModal}
        driverInfo={driverInfo}
        setDriverInfo={setDriverInfo}
      />
    </>
  );
}

export default Price;