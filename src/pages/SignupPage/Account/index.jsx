import { useEffect, useState } from "react";

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
    <div className="w-full sm:w-3/4 mx-auto flex flex-col gap-6 mt-12">
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          이메일을 입력해 주세요.{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="email"
          name="email"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="이메일을 입력해 주세요."
          value={email}
          onChange={emailHandler}
        />
        <p
          className={`mt-2 text-xs font-medium ${
            !validationEmail ? "text-red-600" : "text-white"
          } ${validationEmail && email ? "hidden" : "block"}`}
        >
          이메일 형식이 잘못되었습니다.
        </p>
        <p
          className={`mt-2 text-xs font-medium ${
            emailDuplication ? "text-red-600" : "text-white"
          } ${validationEmail && email ? "block" : "hidden"}`}
        >
          이미 사용중인 이메일입니다.
        </p>
      </div>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          사용하실 아이디를 입력해 주세요.{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="text"
          name="id"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="사용하실 아이디를 입력해 주세요."
          value={id}
          onChange={idHandler}
        />
        <p
          className={`mt-2 text-xs font-medium ${
            idDuplication ? "text-red-600" : "text-white"
          }`}
        >
          이미 사용중인 아이디입니다.
        </p>
      </div>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          사용하실 비밀번호를 입력해 주세요.{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="password"
          name="password"
          className={`border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 ${
            password && "font-mono"
          }`}
          placeholder="사용하실 비밀번호를 입력해 주세요."
          value={password}
          onChange={passwordHandler}
        />
        <p
          className={`mt-2 text-xs font-medium ${
            !validationPassword ? "text-red-600" : "text-white"
          }`}
        >
          영문, 특수기호를 포함해 8자리 이상 입력해 주세요.
        </p>
      </div>
      <div>
        <div className="block mb-2 text-base font-medium text-black">
          비밀번호를 다시 한번 입력해 주세요.{" "}
          <span className="text-red-600 font-bold">*</span>
        </div>
        <input
          type="password"
          name="passwordAgain"
          className={`border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 ${
            passwordAgain && "font-mono"
          }`}
          placeholder="비밀번호를 다시 한번 입력해 주세요."
          value={passwordAgain}
          onChange={passwordAgainHandler}
        />
        <p
          className={`mt-2 text-xs font-medium ${
            !validationPasswordAgain ? "text-red-600" : "text-white"
          }`}
        >
          비밀번호가 일치하지 않습니다.
        </p>
      </div>
    </div>
  );
}

export default Account;
