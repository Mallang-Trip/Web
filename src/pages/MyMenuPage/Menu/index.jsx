import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/modules/userSlice";
import headerBack from "../../../assets/svg/header-back.svg";
import CheckModal from "../../../components/CheckModal";

function Menu() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((state) => state.user);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <div className="w-full mt-8 border-y-[1.5px] border-[#D9D9D9]">
        {user.isAdmin && (
          <button
            className="w-full flex justify-between p-4 my-2"
            onClick={() => navigation("/admin")}
          >
            <span className="text-base">관리자</span>
            <img src={headerBack} alt="더보기" className="rotate-180" />
          </button>
        )}
        <button
          className="w-full flex justify-between p-4 my-2"
          onClick={() => navigation("/my/profile")}
        >
          <span className="text-base">나의 프로필</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-2"
          onClick={() => navigation("/notify")}
        >
          <span className="text-base">알림</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-2"
          onClick={() => alert("준비중 입니다.")}
        >
          <span className="text-base">예약 내역</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-2"
          onClick={() => navigation("/my/article")}
        >
          <span className="text-base">작성글 내역</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-2"
          onClick={() => navigation("/my/party/history")}
        >
          <span className="text-base">최근 본 파티</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-2"
          onClick={() => navigation("/help/list")}
        >
          <span className="text-base">고객 센터</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-2"
          onClick={() => navigation("/my/driver/apply")}
        >
          <span className="text-base">드라이버로 등록하기</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-2"
          onClick={() => setShowLogoutModal(true)}
        >
          <span className="text-base">로그아웃</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
      </div>

      <CheckModal
        showModal={showLogoutModal}
        setShowModal={setShowLogoutModal}
        message={"로그아웃 하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => {
          dispatch(logout());
          setShowLogoutModal(false);
          navigation("/", { replace: true });
        }}
      />
    </>
  );
}

export default Menu;