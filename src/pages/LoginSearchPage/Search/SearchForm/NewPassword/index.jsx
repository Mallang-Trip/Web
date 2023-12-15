import { useRef, useState } from "react";

function NewPassword({ setCompleteSearch }) {
  const passwordConfirmInput = useRef();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value.length >= 8) setPasswordValid(true);
    else setPasswordValid(false);
  };
  const newPasswordConfirmHandler = (e) => {
    setNewPasswordConfirm(e.target.value);
    if (passwordError) setPasswordError(false);
  };

  const changePassword = () => {
    if (!newPasswordConfirm) return;

    if (newPassword !== newPasswordConfirm) {
      setPasswordError(true);
      passwordConfirmInput.current.focus();
    } else setCompleteSearch(true);
  };

  return (
    <div>
      <div className="relative flex flex-row mb-8">
        <input
          type="password"
          name="newPassword"
          placeholder="새롭게 변경할 비밀번호를 입력해 주세요."
          className={`w-[550px] border-b appearance-none border-darkgray focus:outline-none focus:border-primary ${
            newPassword && "font-mono"
          }`}
          value={newPassword}
          onChange={newPasswordHandler}
        />
        {!passwordValid && (
          <span className="absolute left-0 text-xs text-red-500 top-7">
            영문, 특수기호를 포함해 최소 8자리를 입력해주세요.
          </span>
        )}
      </div>
      <div className="relative flex flex-row">
        <input
          type="password"
          name="newPasswordConfirm"
          placeholder="비밀번호를 다시 한번 입력해 주세요."
          className={`w-full border-b border-darkgray focus:outline-none focus:border-primary ${
            newPasswordConfirm && "font-mono"
          }`}
          value={newPasswordConfirm}
          onChange={newPasswordConfirmHandler}
          ref={passwordConfirmInput}
        />
        {passwordError && (
          <span className="absolute left-0 text-xs text-red-500 top-8">
            비밀번호가 일치하지 않습니다.
          </span>
        )}
        <button
          type="button"
          onClick={changePassword}
          className={`w-[125px] h-[30px] text-xs rounded-full border ${
            newPasswordConfirm
              ? "text-white bg-primary border-primary"
              : "text-darkgray bg-white border-darkgray"
          }`}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default NewPassword;
