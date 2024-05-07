import { useSelector } from "react-redux";
import MyProfileButton from "./MyProfileButton";
import ButtonList from "./ButtonList";

function ButtonBox({ userId, setShowModal, nickname, setShowSuspensionModal }) {
  const user = useSelector((state) => state.user);

  return (
    <ButtonList
      userId={userId}
      setShowModal={setShowModal}
      nickname={nickname}
      setShowSuspensionModal={setShowSuspensionModal}
    />
  );
}

export default ButtonBox;
