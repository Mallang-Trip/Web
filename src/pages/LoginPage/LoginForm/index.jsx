import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../components/ConfirmModal";

function LoginForm() {
  const navigation = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const idHandler = (e) => setId(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const loginHandler = (e) => {
    e.preventDefault();

    console.log(id);
    console.log(password);

    setShowErrorModal(true);
    document.body.classList.add("overflow-hidden");
  };

  return (
    <>
      <form className="w-[656px] mx-auto mt-10" onSubmit={loginHandler}>
        <input
          type="id"
          name="id"
          placeholder="아이디를 입력해 주세요."
          className="w-full mb-10 border-b border-darkgray focus:outline-none focus:border-primary"
          value={id}
          onChange={idHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          className={`w-full border-b border-darkgray mb-12 focus:outline-none focus:border-primary ${
            password && "font-mono"
          }`}
          value={password}
          onChange={passwordHandler}
        />
        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="h-12 text-white rounded-full text-md w-80 bg-primary"
          >
            로그인
          </button>
          <button
            type="button"
            className="h-12 bg-white border rounded-full text-darkgray text-md w-80 border-darkgray"
            onClick={() => navigation("/signup")}
          >
            회원가입
          </button>
        </div>
      </form>

      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={
          "아이디 또는 비밀번호를 잘못 입력하였습니다.\n다시 한번 확인해 주세요."
        }
      />
    </>
  );
}

export default LoginForm;
