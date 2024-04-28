import { useState } from "react";
import ProfileModal from "../../../../../components/ProfileModal";
import Body from "./Body";
import Head from "./Head";

function UserTable({ userList }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileId, setProfileId] = useState(-1);

  if (userList.filter((user) => user.role === "ROLE_USER").length === 0)
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

export default UserTable;
