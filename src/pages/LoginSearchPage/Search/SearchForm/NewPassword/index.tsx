import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  memo,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { putNewPassword } from "@/api/users";
import clsx from "clsx";

interface Props {
  setCompleteSearch: Dispatch<SetStateAction<boolean>>;
  phoneNumber: string;
  code: string;
}

function NewPassword({ setCompleteSearch, phoneNumber, code }: Props) {
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const passwordConfirmInput = useRef<HTMLInputElement | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const newPasswordHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (e.target.value.length >= 8) setPasswordValid(true);
    else setPasswordValid(false);
  }, []);

  const newPasswordConfirmHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewPasswordConfirm(e.target.value);
      if (passwordError) setPasswordError(false);
    },
    [passwordError]
  );

  const changePassword = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!newPasswordConfirm) return;
      if (!passwordValid) return;
      if (newPassword !== newPasswordConfirm) {
        setPasswordError(true);
        passwordConfirmInput.current?.focus();
        return;
      }

      try {
        await putNewPassword({
          code,
          phoneNumber,
          newPassword,
        });
        setCompleteSearch(true);
      } catch (e) {
        console.log(e);
      }
    },
    [
      newPasswordConfirm,
      passwordValid,
      newPassword,
      passwordConfirmInput,
      code,
      phoneNumber,
    ]
  );

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
          className={clsx(
            "border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5",
            newPassword && "font-mono"
          )}
          placeholder="새롭게 변경할 비밀번호를 입력해 주세요."
          value={newPassword}
          onChange={newPasswordHandler}
          ref={passwordInput}
        />
        <p
          className={clsx(
            "mt-2 text-xs font-medium",
            passwordValid ? "text-white" : "text-red-600"
          )}
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
          className={clsx(
            "border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5",
            newPasswordConfirm && "font-mono"
          )}
          placeholder="비밀번호를 다시 한번 입력해 주세요."
          value={newPasswordConfirm}
          onChange={newPasswordConfirmHandler}
          ref={passwordConfirmInput}
        />
        <p
          className={clsx(
            "mt-2 text-xs font-medium",
            passwordError ? "text-red-600" : "text-white"
          )}
        >
          비밀번호가 일치하지 않습니다.
        </p>
      </div>
      <button
        type="submit"
        className={clsx(
          "w-full text-sm py-2.5 rounded-lg border",
          newPasswordConfirm && passwordValid
            ? "text-white bg-primary border-primary cursor-pointer"
            : "text-darkgray bg-white border-darkgray cursor-default"
        )}
      >
        확인
      </button>
    </form>
  );
}

export default memo(NewPassword);
