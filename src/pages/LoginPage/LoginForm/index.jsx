import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __asyncLogin } from "../../../redux/modules/userSlice";
import ConfirmModal from "../../../components/ConfirmModal";
import { ReactComponent as Check } from "../../../assets/svg/agree-check.svg";

function LoginForm() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const idRef = useRef();
  const passwordRef = useRef();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [autoLogin, setAutoLogin] = useState(true);

  const idHandler = (e) => setId(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const loginHandler = (e) => {
    e.preventDefault();

    idRef.current.blur();
    passwordRef.current.blur();

    localStorage.setItem("autoLogin", autoLogin);

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
          ref={idRef}
          type="text"
          name="id"
          className="border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5"
          placeholder="아이디를 입력해 주세요."
          value={id}
          onChange={idHandler}
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          className={`border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 my-6 ${
            password && "font-mono"
          }`}
          value={password}
          onChange={passwordHandler}
        />
        <div className="mb-10">
          <input
            id="auto_login"
            type="checkbox"
            className="hidden"
            checked={autoLogin}
            onChange={() => setAutoLogin(!autoLogin)}
          />
          <div className="flex items-center h-full">
            <label
              htmlFor="auto_login"
              className="flex items-center cursor-pointer"
            >
              <div className="relative w-3 h-3 mx-3 border border-darkgray">
                {autoLogin && <Check className="absolute -top-0.5 -left-0.5" />}
              </div>
              <span className="text-darkgray text-sm">로그인 유지</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="h-12 text-white rounded-full text-md w-64 sm:w-80 bg-primary"
          >
            로그인
          </button>
          <button
            type="button"
            className="h-12 bg-white border rounded-full text-darkgray text-md w-64 sm:w-80 border-darkgray"
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
