import { useRef, useState } from "react";
import { putNewPassword } from "../../../../../api/users";

function NewPassword({ setCompleteSearch, phoneNumber, code }) {
  const passwordInput = useRef();
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

  const changePassword = async (e) => {
    e.preventDefault();

    if (!newPasswordConfirm) return;
    if (!passwordValid) return;
    if (newPassword !== newPasswordConfirm) {
      setPasswordError(true);
      passwordConfirmInput.current.focus();
      return;
    }

    try {
      await putNewPassword({
        code: code,
        phoneNumber: phoneNumber,
        newPassword: newPassword,
      });
      setCompleteSearch(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={changePassword}>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          새롭게 변경할 비밀번호를 입력해 주세요.{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="password"
          name="newPassword"
          className={`border border-[#D9D9D9] text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 ${
            newPassword && "font-mono"
          }`}
          placeholder="새롭게 변경할 비밀번호를 입력해 주세요."
          value={newPassword}
          onChange={newPasswordHandler}
          ref={passwordInput}
        />
        <p
          className={`mt-2 text-xs font-medium ${
            passwordValid ? "text-white" : "text-red-600"
          }`}
        >
          영문, 특수기호를 포함해 최소 8자리를 입력해주세요.
        </p>
      </div>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          비밀번호를 다시 한번 입력해 주세요.{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="password"
          name="newPasswordConfirm"
          className={`border border-[#D9D9D9] text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 ${
            newPasswordConfirm && "font-mono"
          }`}
          placeholder="비밀번호를 다시 한번 입력해 주세요."
          value={newPasswordConfirm}
          onChange={newPasswordConfirmHandler}
          ref={passwordConfirmInput}
        />
        <p
          className={`mt-2 text-xs font-medium ${
            passwordError ? "text-red-600" : "text-white"
          }`}
        >
          비밀번호가 일치하지 않습니다.
        </p>
      </div>
      <button
        type="submit"
        className={`w-full text-sm py-2.5 rounded-lg border ${
          newPasswordConfirm && passwordValid
            ? "text-white bg-primary border-primary cursor-pointer"
            : "text-darkgray bg-white border-darkgray cursor-default"
        }`}
      >
        확인
      </button>
    </form>
  );
}

export default NewPassword;
