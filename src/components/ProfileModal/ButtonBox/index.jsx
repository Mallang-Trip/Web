import { useSelector } from "react-redux";
import MyProfileButton from "./MyProfileButton";
import ButtonList from "./ButtonList";

function ButtonBox({ userId, setShowModal, nickname }) {
  const user = useSelector((state) => state.user);

  if (user.userId === userId)
    return <MyProfileButton setShowModal={setShowModal} />;
  else
    return (
      <ButtonList
        userId={userId}
        setShowModal={setShowModal}
        nickname={nickname}
      />
    );
}

export default ButtonBox;
