import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/modules/userSlice";
import { RootState } from "../../../redux/store";
import Ping from "../../../components/Ping";
import headerBack from "../../../assets/svg/header-back.svg";
import CheckModal from "../../../components/CheckModal";

function Menu() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const uncheckedCount = useSelector(
    (state: RootState) => state.notification.uncheckedCount
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <div className="w-full mt-8 border-y-[1.5px] border-mediumgray">
        {user.isAdmin && (
          <button
            className="w-full flex justify-between p-4 my-0.5"
            onClick={() => navigation("/admin/home")}
          >
            <span className="text-base">관리자</span>
            <img src={headerBack} alt="더보기" className="rotate-180" />
          </button>
        )}
        <button
          className="w-full flex justify-between p-4 my-0.5"
          onClick={() => navigation("/my/profile")}
        >
          <span className="text-base">나의 프로필</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-0.5"
          onClick={() => navigation("/notify")}
        >
          <span className="text-base relative">
            알림{uncheckedCount > 0 && <Ping top="0" left="4" />}
          </span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-0.5"
          onClick={() => navigation("/my/payment")}
        >
          <span className="text-base">결제 수단 관리</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-0.5"
          onClick={() => navigation("/my/payment/list")}
        >
          <span className="text-base">결제 내역</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-0.5"
          onClick={() => navigation("/my/reservation")}
        >
          <span className="text-base">예약 내역</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        {user.role === "ROLE_DRIVER" && (
          <button
            className="w-full flex justify-between p-4 my-0.5"
            onClick={() => navigation("/my/driver/income")}
          >
            <span className="text-base">수익 내역</span>
            <img src={headerBack} alt="더보기" className="rotate-180" />
          </button>
        )}
        <button
          className="w-full flex justify-between p-4 my-0.5"
          onClick={() => navigation("/my/article")}
        >
          <span className="text-base">작성글 내역</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-0.5"
          onClick={() => navigation("/my/party/history")}
        >
          <span className="text-base">최근 본 파티</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-0.5"
          onClick={() => navigation("/help/list")}
        >
          <span className="text-base">고객 센터</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-0.5"
          onClick={() => navigation("/my/driver/apply")}
        >
          <span className="text-base">드라이버로 등록하기</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
        <button
          className="w-full flex justify-between p-4 my-0.5"
          onClick={() => setShowLogoutModal(true)}
        >
          <span className="text-base">로그아웃</span>
          <img src={headerBack} alt="더보기" className="rotate-180" />
        </button>
      </div>

      <CheckModal
        showModal={showLogoutModal}
        setShowModal={setShowLogoutModal}
        message="로그아웃 하시겠습니까?"
        noText="취소"
        yesText="확인"
        yesHandler={() => {
          dispatch(logout());
          setShowLogoutModal(false);
          navigation("/", { replace: true });
        }}
      />
    </>
  );
}

export default memo(Menu);
