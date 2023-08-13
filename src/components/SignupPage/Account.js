import React, { useEffect, useState } from "react";
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function Account(props) {
  const [info, setInfo] = useState({
    email: "",
    id: "",
    password: "",
    passwordAgain: "",
  });
  const [validationEmail, setValidationEmail] = useState(true);
  const [validationId, setValidationId] = useState(true);
  const [validationPassword, setValidationPassword] = useState(true);
  const [validationPasswordAgain, setValidationPasswordAgain] = useState(true);

  const emailHandler = (e) => setInfo({ ...info, email: e.target.value });
  const idHandler = (e) => setInfo({ ...info, id: e.target.value });
  const passwordHandler = (e) => setInfo({ ...info, password: e.target.value });
  const passwordAgainHandler = (e) =>
    setInfo({ ...info, passwordAgain: e.target.value });

  useEffect(() => {
    if (info.email && !emailPattern.test(info.email)) setValidationEmail(false);
    else setValidationEmail(true);

    if (info.id && info.id.length < 4) setValidationId(false);
    else setValidationId(true);

    if (info.password && info.password.length < 8) setValidationPassword(false);
    else setValidationPassword(true);

    if (info.passwordAgain && info.password !== info.passwordAgain)
      setValidationPasswordAgain(false);
    else setValidationPasswordAgain(true);
  }, [info]);

  useEffect(() => {
    if (
      info.email &&
      info.id &&
      info.password &&
      info.passwordAgain &&
      validationEmail &&
      validationId &&
      validationPassword &&
      validationPasswordAgain
    )
      props.setActiveNext(true);
    else props.setActiveNext(false);
  }, [
    info,
    validationEmail,
    validationId,
    validationPassword,
    validationPasswordAgain,
  ]);

  return (
    <div className="w-[614px] flex flex-col items-center gap-3 mt-12 mx-auto text-sm">
      <div className="relative flex flex-row w-full my-4">
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해 주세요."
          className="w-full border-b border-darkgray focus:outline-none focus:border-primary"
          value={info.email}
          onChange={emailHandler}
        />
        <span
          className={`absolute left-0 text-xs text-red-500 top-6 ${
            validationEmail && "hidden"
          }`}
        >
          이미 사용중인 이메일입니다. | 이메일 형식이 잘못되었습니다.
        </span>
      </div>
      <div className="relative flex flex-row w-full my-4">
        <input
          type="text"
          name="id"
          placeholder="사용하실 아이디를 입력해 주세요."
          className="w-full border-b border-darkgray focus:outline-none focus:border-primary"
          value={info.id}
          onChange={idHandler}
        />
        <span
          className={`absolute left-0 text-xs text-red-500 top-6 ${
            validationId && "hidden"
          }`}
        >
          이미 사용중인 아이디입니다.
        </span>
      </div>
      <div className="relative flex flex-row w-full my-4">
        <input
          type="password"
          name="password"
          placeholder="영문, 특수기호를 포함한 비밀번호 최소 8자리를 입력해 주세요."
          className={`w-full border-b border-darkgray focus:outline-none focus:border-primary ${
            info.password && "font-mono"
          }`}
          value={info.password}
          onChange={passwordHandler}
        />
        <span
          className={`absolute left-0 text-xs text-red-500 top-6 ${
            validationPassword && "hidden"
          }`}
        >
          영문, 특수기호를 포함해 최소 8자리를 입력해주세요.
        </span>
      </div>
      <div className="relative flex flex-row w-full my-4">
        <input
          type="password"
          name="passwordAgain"
          placeholder="사용하실 아이디를 입력해 주세요."
          className={`w-full border-b border-darkgray focus:outline-none focus:border-primary ${
            info.passwordAgain && "font-mono"
          }`}
          value={info.passwordAgain}
          onChange={passwordAgainHandler}
        />
        <span
          className={`absolute left-0 text-xs text-red-500 top-6 ${
            validationPasswordAgain && "hidden"
          }`}
        >
          비밀번호가 일치하지 않습니다.
        </span>
      </div>
    </div>
  );
}

export default Account;
