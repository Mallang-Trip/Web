import { useNavigate } from "react-router-dom";
import Plus from "../../../assets/svg/plus.svg";

function NewPartyButton() {
  const navigation = useNavigate();

  return (
    <button
      type="button"
      className="animate-bounce flex items-center justify-center fixed bottom-24 right-6 md:right-12 lg:right-40 bg-primary rounded-full w-14 h-14 focus:outline-none"
      onClick={() =>
        navigation(
          `/party/new/1?region=${null}&member=${null}&date=${null}&driverId=${null}`
        )
      }
    >
      <img src={Plus} alt="new_party" className="w-9 h-9" />
    </button>
  );
}

export default NewPartyButton;
