import { useNavigate } from "react-router-dom";
import { partyStatusObj } from "../../../../utils/data";
import { priceToString } from "../../../../utils";

function Party({
  partyName,
  startDate,
  partyId,
  driverName,
  capacity,
  headcount,
  partyMembers,
  status,
  driverPenaltyAmount,
  driverPenaltyStatus,
  driverProfileImg,
  partyPrivateChatRoomId,
  partyPublicChatRoomId,
  setMallangTalkInfo,
  setShowMallangTalkModal,
  setReceiptInfo,
  setShowReceiptModal,
  current,
}) {
  const navigation = useNavigate();

  return (
    <div className="flex flex-col px-5 py-6 font-medium border border-gray-300 rounded-3xl mb-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex items-center text-lg text-black font-bold">
            {partyName}
            <div className="text-sm text-gray500 font-medium ml-2">
              {startDate.replaceAll("-", ".")}
            </div>
          </div>
          <div className="text-sm text-gray700 mt-1">
            {partyStatusObj[status]}
          </div>
        </div>
        <div className="font-bold">
          <button
            className="bg-lightgray h-10 px-4 py-1.5 text-darkgray text-sm rounded-xl mr-2.5"
            onClick={() => {
              localStorage.setItem("payment_current", current);
              navigation(`/admin/party?party_id=${partyId}`);
            }}
          >
            파티로 이동
          </button>
          <button
            className="bg-lightgray h-10 px-4 py-1.5 text-darkgray text-sm rounded-xl mr-2.5"
            onClick={() => {
              if (
                partyPrivateChatRoomId === null ||
                partyPublicChatRoomId === null
              )
                return alert("말랑챗 정보가 없습니다.");
              setMallangTalkInfo({
                partyName: partyName,
                partyPrivateChatRoomId: partyPrivateChatRoomId,
                partyPublicChatRoomId: partyPublicChatRoomId,
              });
              setShowMallangTalkModal(true);
            }}
          >
            말랑챗
          </button>
          <button
            className="bg-skyblue h-10 px-4 py-1.5 text-primary text-sm rounded-xl"
            onClick={() => {
              setReceiptInfo({
                driverName: driverName,
                driverPenaltyAmount: driverPenaltyAmount,
                driverPenaltyStatus: driverPenaltyStatus,
                driverProfileImg: driverProfileImg,
                partyMembers: partyMembers,
                status: status,
                partyId: partyId,
              });
              setShowReceiptModal(true);
            }}
          >
            영수증 보기
          </button>
        </div>
      </div>
      <hr className="w-full h-[0.03125rem] my-5 bg-mediumgray" />
      <div className="flex justify-between w-full">
        <div className="flex flex-col text-sm text-[#939094] w-24">
          드라이버
          <div
            className={`mt-1.5 ${driverPenaltyAmount ? (driverPenaltyStatus === "PENALTY_PAYMENT_COMPLETE" ? "text-primary" : "text-[#FF0000]") : "text-gray700"}`}
          >
            {`${driverName} 드라이버`}
            {driverPenaltyAmount && (
              <>
                <br />
                <span>({priceToString(driverPenaltyAmount)}원 위약금)</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col text-sm text-[#939094] w-24">
          파티원 수
          <div className="mt-1.5 text-gray700">
            {`${headcount}/${capacity} 명`}
          </div>
        </div>
        <div className="flex flex-col text-sm text-[#939094] w-72">
          여행자 정보
          <div className="flex mt-1.5 text-gray700">
            {partyMembers.map((member) => (
              <div key={member.userId} className="mr-5">
                {member.nickname}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Party;
