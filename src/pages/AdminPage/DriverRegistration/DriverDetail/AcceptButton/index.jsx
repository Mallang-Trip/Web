import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPartyRoomId } from "../../../../../redux/modules/talkRoomSlice";
import { putDriverApplyAcceptAdmin } from "../../../../../api/driver";
import { makeNewCoupleChat } from "../../../../../api/chat";

function AcceptButton({ getDriverApplyAdminFunc }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const driverId = searchParams.get("driverId");

  const driverApplyAcceptHandler = async (accept) => {
    try {
      await putDriverApplyAcceptAdmin(driverId, accept);

      if (accept) alert("드라이버 등록이 승인되었습니다.");
      else alert("드라이버 등록이 반려되었습니다.");

      getDriverApplyAdminFunc();
      navigation(-1);
    } catch (e) {
      console.log(e);
    }
  };

  const goDriverChat = async () => {
    try {
      const result = await makeNewCoupleChat(driverId);
      dispatch(setPartyRoomId(result.payload.chatRoomId));
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-20 flex flex-col gap-10 justify-center items-center">
      <div className="flex gap-10 justify-center items-center">
        <button
          className="w-72 h-12 text-base text-[#ff0000] font-bold bg-[#FFEAEA] border border-[#ff0000] rounded-full"
          onClick={() => driverApplyAcceptHandler(false)}
        >
          반려하기
        </button>
        <button
          className="w-72 h-12 text-base text-primary font-bold bg-skyblue border border-primary rounded-full"
          onClick={() => driverApplyAcceptHandler(true)}
        >
          승인하기
        </button>
      </div>
      <button
        className="w-72 h-12 text-base text-gray500 font-bold bg-white border border-gray400 rounded-full"
        onClick={goDriverChat}
      >
        드라이버에게 1:1 톡하기
      </button>
    </div>
  );
}

export default AcceptButton;