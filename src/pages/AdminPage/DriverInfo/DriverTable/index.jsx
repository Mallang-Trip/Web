import { useState } from "react";
import ProfileModal from "../../../../components/ProfileModal";
import Body from "./Body";
import Head from "./Head";

function DriverTable({ userList }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileId, setProfileId] = useState(-1);

  if (userList.length === 0)
    return (
      <div className="mt-20 text-base text-black font-medium text-center">
        드라이버 회원 정보가 없습니다.
      </div>
    );
  return (
    <>
      <div className="w-full mt-10 flex flex-col gap-2 text-sm font-semibold">
        <Head />
        {userList
          .filter((user) => user.role === "ROLE_DRIVER")
          .map((driver) => (
            <Body
              key={driver.userId}
              setProfileId={setProfileId}
              setShowProfileModal={setShowProfileModal}
              {...driver}
            />
          ))}
      </div>

      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={profileId}
      />
    </>
  );
}

export default DriverTable;
