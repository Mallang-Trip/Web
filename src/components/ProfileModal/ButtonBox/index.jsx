import { useSelector } from "react-redux";
import MyProfileButton from "./MyProfileButton";
import AdminButtonList from "./AdminButtonList";
import ButtonList from "./ButtonList";

function ButtonBox({
  userId,
  setShowModal,
  nickname,
  chatRoomId,
  reportId,
  suspensionDuration,
  getUserInfoFunc,
}) {
  const user = useSelector((state) => state.user);

  if (user.userId === userId)
    return <MyProfileButton setShowModal={setShowModal} />;
  if (user.role === "ROLE_ADMIN" && reportId)
    return (
      <AdminButtonList
        userId={userId}
        reportId={reportId}
        setShowModal={setShowModal}
        suspensionDuration={suspensionDuration}
        getUserInfoFunc={getUserInfoFunc}
      />
    );
  return (
    <ButtonList
      userId={userId}
      setShowModal={setShowModal}
      nickname={nickname}
      chatRoomId={chatRoomId}
    />
  );
}

export default ButtonBox;
