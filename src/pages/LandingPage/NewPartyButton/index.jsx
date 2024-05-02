import { useNavigate } from "react-router-dom";
import newPartyIcon from "../../../assets/svg/new-party-icon.svg";

function NewPartyButton() {
  const navigation = useNavigate();

  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center gap-0.5 fixed bottom-24 right-6 lg:right-12 xl:right-40 bg-skyblue rounded-[20px] w-14 h-14 focus:outline-none"
      onClick={() =>
        navigation(
          `/party/new/1?region=${null}&member=${null}&date=${null}&driverId=${null}`
        )
      }
    >
      <img src={newPartyIcon} alt="파티 만들기" />
      <span className="text-[8px] text-primary font-bold">파티 만들기</span>
    </button>
  );
}

export default NewPartyButton;
