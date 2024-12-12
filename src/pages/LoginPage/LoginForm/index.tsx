import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __asyncLogin } from "../../../redux/modules/userSlice";
import { AppDispatch } from "../../../redux/store";
import ConfirmModal from "../../../components/ConfirmModal";
import CheckIcon from "../../../assets/svg/agree-check.svg";
import clsx from "clsx";

function LoginForm() {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const idRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [autoLogin, setAutoLogin] = useState(true);

  const idHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setId(e.target.value),
    []
  );

  const passwordHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  );

  const loginHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      idRef.current?.blur();
      passwordRef.current?.blur();

      localStorage.setItem("autoLogin", autoLogin.toString());

      const body = { id, password };

      dispatch(__asyncLogin(body)).then((response) => {
        const redirect = localStorage.getItem("redirect");

        if (response.payload) {
          if (redirect) navigation(redirect, { replace: true });
          else navigation(-1);
        } else setShowErrorModal(true);
      });
    },
    [idRef, passwordRef, autoLogin, id, password]
  );

  useEffect(() => {
    return () => localStorage.removeItem("redirect");
  }, []);

  return (
    <>
      <form
        className="w-full max-w-[600px] mx-auto mt-10 px-5"
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
          className={clsx(
            "border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block w-full p-2.5 my-6",
            password && "font-mono"
          )}
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
                {autoLogin && (
                  <img
                    src={CheckIcon}
                    className="absolute top-0 left-0 w-3 h-3"
                  />
                )}
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

export default memo(LoginForm);
