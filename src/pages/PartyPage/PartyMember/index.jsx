import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPartyRoomId } from "../../../redux/modules/talkRoomSlice";
import { getUserInfo } from "../../../api/users";
import { getPartyChatId } from "../../../api/chat";
import MemberProfile from "./MemberProfile";
import ProfileModal from "../../../components/ProfileModal";
import partyChatIcon from "../../../assets/svg/go-party-chat.svg";
import CheckModal from "../../../components/CheckModal";
import ConfirmModal from "../../../components/ConfirmModal";

function PartyMember({
  partyId,
  headcount,
  capacity,
  members,
  driverId,
  driverName,
  myParty,
  driverReady,
  partyStatus,
  proposal,
}) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [driverInfo, setDriverInfo] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(0);

  const goPartyChat = async () => {
    if (!user.auth) return setShowLoginModal(true);

    try {
      const result = await getPartyChatId(partyId);

      if (result.statusCode !== 200) {
        setErrorMessage(result.message);
        setShowErrorModal(true);
        return;
      }

      dispatch(setPartyRoomId(result.payload.chatRoomId));
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  };

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
          <p className="flex gap-1.5 items-center">
            <span className="text-lg font-bold text-black">참여 여행자</span>
            <span className="text-base font-thin text-darkgray">|</span>
            <button
              className="text-lg font-bold text-primary flex gap-1.5 items-center"
              onClick={goPartyChat}
            >
              말랑챗 참여하기 <img src={partyChatIcon} alt="말랑챗" />
            </button>
          </p>
          <p className="text-sm text-darkgray font-medium">{`${headcount}/${capacity}명`}</p>
        </div>
        <div className="w-full flex gap-2.5 flex-nowrap overflow-x-auto noScrollBar">
          <MemberProfile
            myParty={myParty || partyStatus === "WAITING_JOIN_APPROVAL"}
            setShowProfileModal={setShowProfileModal}
            setUserId={setUserId}
            ready={
              driverReady ||
              partyStatus === "SEALED" ||
              partyStatus === "WAITING_COURSE_CHANGE_APPROVAL"
            }
            agreement={
              partyStatus === "WAITING_DRIVER_APPROVAL" ||
              partyStatus === "CANCELED_BY_PROPOSER"
                ? "WAITING"
                : partyStatus === "CANCELED_BY_DRIVER_REFUSED"
                  ? "REFUSE"
                  : partyStatus === "CANCELED_BY_DRIVER_QUIT"
                    ? "EXIT"
                    : partyStatus === "WAITING_COURSE_CHANGE_APPROVAL" &&
                        proposal?.proposerId === driverId
                      ? "PROPOSER"
                      : proposal?.driverAgreement
            }
            {...driverInfo}
            nickname={`${driverName} 드라이버`}
          />
          {partyStatus === "WAITING_JOIN_APPROVAL" && (
            <MemberProfile
              myParty={true}
              setShowProfileModal={setShowProfileModal}
              setUserId={setUserId}
              ready={false}
              agreement={"PROPOSER"}
              userId={proposal?.proposerId}
              profileImg={proposal?.proposerProfileImg}
              nickname={proposal?.proposerNickname}
              introduction={proposal.content || "제안자 입니다."}
              ageRange={proposal?.proposerAgeRange}
              gender={proposal?.proposerGender}
              companions={proposal?.proposerCompanions}
            />
          )}
          {members.map((item) => (
            <MemberProfile
              key={item.userId}
              myParty={myParty || partyStatus === "WAITING_JOIN_APPROVAL"}
              setShowProfileModal={setShowProfileModal}
              setUserId={setUserId}
              agreement={
                partyStatus === "WAITING_DRIVER_APPROVAL" ||
                partyStatus === "CANCELED_BY_DRIVER_REFUSED" ||
                proposal?.proposerId === item.userId
                  ? "PROPOSER"
                  : partyStatus === "CANCELED_BY_PROPOSER"
                    ? "CANCELED"
                    : partyStatus === "CANCELED_BY_ALL_QUIT"
                      ? "EXIT"
                      : proposal?.memberAgreement?.filter(
                          (member) => member.userId === item.userId
                        )[0].status
              }
              {...item}
              ready={
                item.ready ||
                partyStatus === "SEALED" ||
                partyStatus === "WAITING_COURSE_CHANGE_APPROVAL"
              }
            />
          ))}
        </div>
      </div>
      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={userId}
        driverName={userId === driverId && `${driverName} 드라이버`}
      />
      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => navigation("/login")}
      />
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={errorMessage}
      />
    </>
  );
}

export default PartyMember;
