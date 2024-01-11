import { useEffect, useState } from "react";
import { getUserInfo } from "../../../api/users";
import ProfileModal from "../../../components/ProfileModal";
import MemberProfile from "./MemberProfile";

function PartyMember({ headcount, capacity, members, driverId, myParty }) {
  const [driverInfo, setDriverInfo] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userId, setUserId] = useState(0);

  const getDriverInfo = async () => {
    try {
      const result = await getUserInfo(driverId);
      setDriverInfo(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDriverInfo();
  }, []);

  return (
    <>
      <div className="my-7">
        <div className="flex flex-col gap-1 mb-7">
          <p className="text-lg text-black font-bold">참여 여행자</p>
          <p className="text-sm text-darkgray font-medium">{`${headcount}/${capacity}명`}</p>
        </div>
        <div className="w-full flex gap-2.5 flex-nowrap overflow-x-auto noScrollBar">
          <MemberProfile
            myParty={myParty}
            setShowProfileModal={setShowProfileModal}
            setUserId={setUserId}
            {...driverInfo}
          />
          {members.map((item) => (
            <MemberProfile
              key={item.userId}
              myParty={myParty}
              setShowProfileModal={setShowProfileModal}
              setUserId={setUserId}
              {...item}
            />
          ))}
        </div>
      </div>
      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={userId}
      />
    </>
  );
}

export default PartyMember;
