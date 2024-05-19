import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../../redux/modules/userSlice";
import { deleteUser } from "../../../../../../api/users";
import ConfirmModal from "../../../../../../components/ConfirmModal";

function ExitModal({ showModal, setShowModal }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const modalRef = useRef();
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);

  const exitHandler = async () => {
    if (inputMessage !== "회원 탈퇴") {
      setMessage("회원 탈퇴를 잘못 입력하였습니다.");
      setShowMessageModal(true);
      return;
    }

    try {
      const { statusCode } = await deleteUser();

      if (statusCode !== 200)
        setMessage(
          "예약된 파티 내역이 남아 있어 탈퇴 실패했습니다.\n해당 파티를 예약 취소한 뒤 처리해주세요."
        );
      else {
        alert(
          "말랑트립 회원 탈퇴 완료하였습니다.\n문제 발생 시 고객센터로 문의해주세요."
        );
        dispatch(logout());
        navigation("/", { replace: true });
      }
    } catch (e) {
      console.log(e);
      setMessage("회원 탈퇴에 실패했습니다.");
    } finally {
      setShowMessageModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
    else if (event.key === "Enter") yesHandler();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setInputMessage("");

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <>
      <div
        className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
          showModal ? "active" : ""
        }`}
        ref={modalRef}
        onClick={(e) => modalOutSideClick(e)}
      >
        <div className="m-auto shadow w-96 rounded-xl">
          <div className="flex flex-col justify-center h-64 text-center text-black font-bold whitespace-pre bg-white rounded-t-xl">
            <div>
              정말로 회원 탈퇴하시겠습니까?
              <br />
              <br />
              예약된 파티 내역이 있으면 탈퇴 처리할 수 없으며
              <br />
              회원 탈퇴 시 정보를 다시 불러올 수 없습니다.
              <br />
              탈퇴 진행을 위해 아래 '회원 탈퇴'를 입력해주세요.
            </div>
            <input
              type="text"
              className="w-4/5 h-12 mx-auto mt-6 bg-lightgray rounded-lg text-sm text-primary font-medium text-center focus:outline-primary"
              placeholder="'회원 탈퇴'를 입력해주세요."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
          </div>
          <div className="flex">
            <button
              className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
              onClick={exitHandler}
            >
              확인
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        showModal={showMessageModal}
        setShowModal={setShowMessageModal}
        message={message}
      />
    </>
  );
}

export default ExitModal;
