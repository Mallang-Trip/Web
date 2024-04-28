import DriverItem from "./DriverItem";
import ProfileModal from "../../../../../components/ProfileModal";
import { useState } from "react";

function DriverList({ regionDriverData }) {
  const [driverId, setDriverId] = useState(-1);
  const [showProfileModal, setShowProfileModal] = useState(false);

  if (regionDriverData.length === 0)
    return (
      <div className="mt-20 text-center">
        해당 지역에 드라이버가 존재하지 않습니다.
      </div>
    );
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        {regionDriverData.map((driver) => (
          <DriverItem
            key={driver.driverId}
            setDriverId={setDriverId}
            setShowProfileModal={setShowProfileModal}
            {...driver}
          />
        ))}
      </div>
      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={driverId}
      />
    </>
  );
}

export default DriverList;
