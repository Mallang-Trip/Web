import { useState } from "react";
import { useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import Information from "../Information";
import NewPasswordModal from "./NewPasswordModal";

function LoginInfo({ modifyMode, email, emailHandler }) {
  const user = useSelector((state) => state.user);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">로그인 정보</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Information
          title={"이메일 주소"}
          content={email}
          modifyMode={modifyMode}
          onChangeHandler={emailHandler}
        />
        <Information title={"아이디"} content={user.loginId} />
        <Information title={"비밀번호"} content={"*********"} />
        <EditButton
          className="w-36 mx-auto md:m-0"
          onClick={() => setShowPasswordModal(true)}
          title="비밀번호 변경"
        />
      </div>
      <NewPasswordModal
        showModal={showPasswordModal}
        setShowModal={setShowPasswordModal}
      />
    </>
  );
}

export default LoginInfo;
