import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const loginHandler = (e) => {
    e.preventDefault();

    console.log(email);
    console.log(password);
  };

  return (
    <form className="w-[656px] mx-auto mt-10" onSubmit={loginHandler}>
      <input
        type="email"
        placeholder="이메일을 입력해 주세요."
        className="w-full border-b border-[#666666] mb-10 focus:outline-none focus:border-primary"
        value={email}
        onChange={emailHandler}
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해 주세요."
        className={`w-full border-b border-[#666666] mb-12 focus:outline-none focus:border-primary ${
          password && "font-mono"
        }`}
        value={password}
        onChange={passwordHandler}
      />
      <button
        type="submit"
        className="w-full h-[30px] text-sm text-white bg-primary rounded-lg"
      >
        로그인
      </button>
      <button
        type="button"
        className="w-full mt-5 h-[30px] text-sm text-black bg-[#D9D9D9] rounded-lg"
      >
        회원가입
      </button>
    </form>
  );
}

export default LoginForm;
