import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __asyncLogin } from "../../../redux/modules/userSlice";
import ConfirmModal from "../../../components/ConfirmModal";

function LoginForm() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const idHandler = (e) => setId(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const loginHandler = (e) => {
    e.preventDefault();

    const body = {
      id: id,
      password: password,
    };

    dispatch(__asyncLogin(body)).then((response) => {
      if (response.payload) navigation(-1, { replace: true });
      else setShowErrorModal(true);
    });
  };

  return (
    <>
      <form
        className="w-full md:w-3/5 mx-auto mt-10 px-5"
        onSubmit={loginHandler}
      >
        <input
          type="id"
          name="id"
          className="border border-[#D9D9D9] text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="아이디를 입력해 주세요."
          value={id}
          onChange={idHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          className={`border border-[#D9D9D9] text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 mt-6 mb-12 ${
            password && "font-mono"
          }`}
          value={password}
          onChange={passwordHandler}
        />
        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="h-12 text-white rounded-full text-md w-64 md:w-80 bg-primary"
          >
            로그인
          </button>
          <button
            type="button"
            className="h-12 bg-white border rounded-full text-darkgray text-md w-64 md:w-80 border-darkgray"
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
