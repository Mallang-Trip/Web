import { useState } from "react";
import { useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import Information from "../Information";
import NewPasswordModal from "./NewPasswordModal";
import ExitButton from "./ExitButton";

function LoginInfo({ email, emailHandler }) {
  const user = useSelector((state) => state.user);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">로그인 정보</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Information
          title={"이메일 주소"}
          content={email}
          modifyMode={true}
          onChangeHandler={emailHandler}
        />
        <Information title={"아이디"} content={user.loginId} />
        <Information title={"비밀번호"} content={"*********"} />
        <div className="flex justify-center md:justify-start gap-4">
          <EditButton
            className="w-36"
            onClick={() => setShowPasswordModal(true)}
            title="비밀번호 변경"
          />
          <ExitButton />
        </div>
      </div>
      <NewPasswordModal
        showModal={showPasswordModal}
        setShowModal={setShowPasswordModal}
      />
    </>
  );
}

export default LoginInfo;
