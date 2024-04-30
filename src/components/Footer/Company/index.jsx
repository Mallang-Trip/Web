import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPartyRoomId } from "../../../redux/modules/talkRoomSlice";
import { makeNewCoupleChat } from "../../../api/chat";
import CheckModal from "../../CheckModal";

function Company() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const goMallangTalk = async () => {
    if (!user.auth) return setShowLoginModal(true);
    if (user.userId === 0) return navigation("/talk");

    try {
      const result = await makeNewCoupleChat(0);
      dispatch(setPartyRoomId(result.payload.chatRoomId));
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="mb-10 flex justify-between flex-col md:flex-row mx-5 min-[900px]:mx-20 gap-5 pl-5 md:pl-0">
        <div className="text-xs text-darkgray">
          <p className="text-sm text-boldgray font-bold mb-2.5">말랑트립</p>
          <p>대표 : 김제윤</p>
          <p className="my-1">사업자등록번호 : 399-51-00784</p>
          <p>경기도 안양시 동안구 시민대로327번길 11-41 3층 8호실</p>
        </div>
        <div className="text-xs text-darkgray">
          <p className="text-sm text-boldgray font-bold mb-2.5">고객문의</p>
          <p>
            실시간 고객상담 :{" "}
            <span
              className="underline underline-offset-2 cursor-pointer"
              onClick={goMallangTalk}
            >
              말랑톡
            </span>
            ,{" "}
            <Link
              to="http://pf.kakao.com/_tfMxaG/chat"
              target="_blank"
              className="underline underline-offset-2"
            >
              공식 카카오톡
            </Link>
          </p>
          <p className="my-1">유선 번호 : 070-8080-2665</p>
          <p>기타문의 : mallangtrip@mallangtrip.com</p>
        </div>
        <div className="text-xs text-darkgray">
          <p className="text-sm text-boldgray font-bold mb-2.5">SNS</p>
          <p>
            INSTAGRAM :{" "}
            <Link
              to="https://www.instagram.com/mallang_trip/?hl=ko"
              target="_blank"
              className="underline underline-offset-2"
            >
              @mallang_trip
            </Link>
          </p>
          <p className="my-1">
            KAKAO TALK :{" "}
            <Link
              to="http://pf.kakao.com/_tfMxaG/chat"
              target="_blank"
              className="underline underline-offset-2"
            >
              말랑트립 카카오톡
            </Link>
          </p>
        </div>
      </div>

      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => navigation("/login")}
      />
    </>
  );
}

export default Company;
