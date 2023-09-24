import React, { useEffect, useState } from "react";

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function Account({
  setActiveNext,
  email,
  id,
  password,
  passwordAgain,
  setEmail,
  setId,
  setPassword,
  setPasswordAgain,
  emailDuplication,
  setEmailDuplication,
  idDuplication,
  setIdDuplication,
}) {
  const [validationEmail, setValidationEmail] = useState(true);
  const [validationPassword, setValidationPassword] = useState(true);
  const [validationPasswordAgain, setValidationPasswordAgain] = useState(true);

  const emailHandler = (e) => {
    setEmailDuplication(false);
    setEmail(e.target.value);
  };
  const idHandler = (e) => {
    setIdDuplication(false);
    setId(e.target.value);
  };
  const passwordHandler = (e) => setPassword(e.target.value);
  const passwordAgainHandler = (e) => setPasswordAgain(e.target.value);

  useEffect(() => {
    if (email && !emailPattern.test(email)) setValidationEmail(false);
    else setValidationEmail(true);

    if (password && password.length < 8) setValidationPassword(false);
    else setValidationPassword(true);

    if (passwordAgain && password !== passwordAgain)
      setValidationPasswordAgain(false);
    else setValidationPasswordAgain(true);
  }, [email, password, passwordAgain]);

  useEffect(() => {
    if (
      email &&
      password &&
      passwordAgain &&
      validationEmail &&
      validationPassword &&
      validationPasswordAgain
    )
      setActiveNext(true);
    else setActiveNext(false);
  }, [
    email,
    id,
    password,
    passwordAgain,
    validationEmail,
    idDuplication,
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
          value={email}
          onChange={emailHandler}
        />
        <span
          className={`absolute left-0 text-xs text-red-500 top-6 ${
            validationEmail && "hidden"
          }`}
        >
          이메일 형식이 잘못되었습니다.
        </span>
        <span
          className={`absolute left-0 text-xs text-red-500 top-6 ${
            emailDuplication ? "inline" : "hidden"
          }`}
        >
          이미 사용중인 이메일입니다.
        </span>
      </div>
      <div className="relative flex flex-row w-full my-4">
        <input
          type="text"
          name="id"
          placeholder="사용하실 아이디를 입력해 주세요."
          className="w-full border-b border-darkgray focus:outline-none focus:border-primary"
          value={id}
          onChange={idHandler}
        />
        <span
          className={`absolute left-0 text-xs text-red-500 top-6 ${
            idDuplication ? "inline" : "hidden"
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
            password && "font-mono"
          }`}
          value={password}
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
          placeholder="비밀번호를 다시 한번 입력해 주세요."
          className={`w-full border-b border-darkgray focus:outline-none focus:border-primary ${
            passwordAgain && "font-mono"
          }`}
          value={passwordAgain}
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
