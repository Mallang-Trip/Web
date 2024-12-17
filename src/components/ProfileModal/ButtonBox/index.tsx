import { Dispatch, memo, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MyProfileButton from "./MyProfileButton";
import AdminButtonList from "./AdminButtonList";
import ButtonList from "./ButtonList";

interface Props {
  userId: number | undefined;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  nickname: string | undefined;
  chatRoomId: number | undefined;
  reportId: number | undefined;
  suspensionDuration: number | undefined;
  getUserInfoFunc: () => void;
}

function ButtonBox({
  userId,
  setShowModal,
  nickname,
  chatRoomId,
  reportId,
  suspensionDuration,
  getUserInfoFunc,
}: Props) {
  const user = useSelector((state: RootState) => state.user);

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

export default memo(ButtonBox);
