import { useState, useEffect, useRef } from "react";
import { putPassword } from "../../../../../api/profile";

function NewPasswordModal({ showModal, setShowModal }) {
  const modalRef = useRef();
  const [nowPassword, setNowPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [nowPasswordValidation, setNowPasswordValidation] = useState(true);
  const [newPasswordValidation, setNewPasswordValidation] = useState(true);
  const [newPasswordAgainValidation, setNewPasswordAgainValidation] =
    useState(true);

  const closeModal = () => {
    setNowPassword("");
    setNewPassword("");
    setNewPasswordAgain("");
    setShowModal(false);
  };

  const nowPasswordHandler = (e) => {
    setNowPasswordValidation(true);
    setNowPassword(e.target.value);
  };
  const newPasswordHandler = (e) => {
    setNewPasswordValidation(true);
    setNewPassword(e.target.value);
  };
  const newPasswordAgainHandler = (e) => {
    setNewPasswordAgainValidation(true);
    setNewPasswordAgain(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) return setNewPasswordValidation(false);
    if (newPassword !== newPasswordAgain)
      return setNewPasswordAgainValidation(false);

    try {
      const result = await putPassword({
        before: nowPassword,
        after: newPassword,
      });

      if (result.statusCode === 401) setNowPasswordValidation(false);
      else {
        alert("비밀번호가 변경되었습니다.");
        closeModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal && "active"
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="relative w-full max-w-xl max-h-full m-auto">
        <form onSubmit={submitHandler}>
          <div className="relative bg-white rounded-t-lg">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={closeModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-bold text-black">
                비밀번호 변경하기
              </h3>
              <div className="flex flex-col gap-6">
                <div>
                  <label
                    htmlFor="nowPassword"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    현재 비밀번호{" "}
                    <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="password"
                    id="nowPassword"
                    className={`border border-[#D9D9D9] text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 ${
                      nowPassword && "font-mono"
                    }`}
                    placeholder="현재 사용하고 있는 비밀번호를 입력해주세요."
                    value={nowPassword}
                    onChange={nowPasswordHandler}
                  />
                  <p
                    className={`mt-2 text-xs text-red-600 ${
                      nowPasswordValidation ? "hidden" : "block"
                    }`}
                  >
                    <span className="font-medium">
                      비밀번호를 잘못 입력하셨습니다.
                    </span>
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    새로운 비밀번호{" "}
                    <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className={`border border-[#D9D9D9] text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 ${
                      newPassword && "font-mono"
                    }`}
                    placeholder="변경하실 비밀번호를 입력해 주세요."
                    value={newPassword}
                    onChange={newPasswordHandler}
                  />
                  <p
                    className={`mt-2 text-xs text-red-600 ${
                      newPasswordValidation ? "hidden" : "block"
                    }`}
                  >
                    <span className="font-medium">
                      영문, 특수기호를 포함해 최소 8자리를 입력해주세요.
                    </span>
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="newPasswordAgain"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    새로운 비밀번호 확인{" "}
                    <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="password"
                    id="newPasswordAgain"
                    className={`border border-[#D9D9D9] text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 ${
                      newPasswordAgain && "font-mono"
                    }`}
                    placeholder="새로운 비밀번호를 다시 한번 입력해 주세요."
                    value={newPasswordAgain}
                    onChange={newPasswordAgainHandler}
                  />
                  <p
                    className={`mt-2 text-xs text-red-600 ${
                      newPasswordAgainValidation ? "hidden" : "block"
                    }`}
                  >
                    <span className="font-medium">
                      비밀번호가 일치하지 않습니다.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-16 text-lg text-center text-white rounded-b-lg bg-primary"
          >
            확인
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPasswordModal;
