import { Dispatch, memo, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { NewDriverInfo } from "@/types";

interface Props {
  driver: NewDriverInfo;
  setDriverInfo: Dispatch<SetStateAction<NewDriverInfo>>;
}

function DriverItem({ driver, setDriverInfo }: Props) {
  const navigation = useNavigate();

  return (
    <button
      className="w-full flex text-sm items-center px-4 py-3 font-medium border border-gray300 rounded-lg hover:border-primary"
      onClick={() => {
        setDriverInfo(driver);
        navigation(`/admin/driver-registration?driverId=${driver.driverId}`);
      }}
    >
      <span className="text-gray700 pr-2 mr-2 border-r border-gray500">
        {driver.accountHolder}
      </span>
      <span className="text-gray700">{driver.region.join(" / ")}</span>
      <span className="text-gray700 pl-2 ml-2 border-l border-gray500">
        {driver.introduction || "자기소개 없음"}
      </span>
      <span className="ml-auto text-[#ff0000] font-bold">{driver.status}</span>
    </button>
  );
}

export default memo(DriverItem);
