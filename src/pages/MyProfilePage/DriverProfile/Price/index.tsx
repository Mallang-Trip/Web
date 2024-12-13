import { Dispatch, memo, SetStateAction, useState } from "react";
import { priceToString } from "../../../../utils";
import { DriverInfo } from "../../../../types";
import PriceInfo from "./PriceInfo";
import PriceModal from "./PriceModal";

interface Props {
  modifyMode: boolean;
  driverInfo: DriverInfo;
  setDriverInfo: Dispatch<SetStateAction<DriverInfo>>;
}

function Price({ modifyMode, driverInfo, setDriverInfo }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">가격 설정</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

export default memo(Price);
