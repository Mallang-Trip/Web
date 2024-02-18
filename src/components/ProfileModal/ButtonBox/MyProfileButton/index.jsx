import { useNavigate } from "react-router-dom";

function MyProfileButton({ setShowModal }) {
  const navigation = useNavigate();

  const clickHandler = () => {
    setShowModal(false);
    navigation("/my/profile");
  };

  return (
    <div className="flex justify-center mb-12 mx-8">
      <button
        className="w-full rounded-full py-2 border border-primary text-base text-primary bg-skyblue"
        onClick={clickHandler}
      >
        나의 프로필
      </button>
    </div>
  );
}

export default MyProfileButton;
