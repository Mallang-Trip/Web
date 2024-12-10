import { memo, useState } from "react";
import { UserData } from "../../../../../types";
import ProfileModal from "../../../../../components/ProfileModal";
import Body from "./Body";
import Head from "./Head";
import RegionModal from "./RegionModal";

interface Props {
  userList: UserData[];
}

function UserTable({ userList }: Props) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [profileId, setProfileId] = useState(-1);

  if (
    !userList ||
    userList.filter((user) => user.role === "ROLE_USER").length === 0
  )
    return (
      <div className="mt-20 text-base text-black font-medium text-center">
        여행자 회원 정보가 없습니다.
      </div>
    );
  return (
    <>
      <div className="w-full mt-10 flex flex-col gap-2 text-sm font-semibold">
        <Head />
        {userList
          .filter((user) => user.role === "ROLE_USER")
          .map((driver) => (
            <Body
              key={driver.userId}
              setProfileId={setProfileId}
              setShowProfileModal={setShowProfileModal}
              setShowRegionModal={setShowRegionModal}
              {...driver}
            />
          ))}
      </div>

      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={profileId}
        driverName={false}
      />
      <RegionModal
        showModal={showRegionModal}
        setShowModal={setShowRegionModal}
        userId={profileId}
      />
    </>
  );
}

export default memo(UserTable);
