import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  image: string;
  setRegion: Dispatch<SetStateAction<string>>;
  member: number;
  driverId: string | number;
  date: string;
  setShowKakaoChatModal: Dispatch<SetStateAction<boolean>>;
}

function RegionButton({
  name,
  image,
  setRegion,
  member,
  driverId,
  date,
  setShowKakaoChatModal,
}: Props) {
  const navigation = useNavigate();

  const clickHandler = useCallback(() => {
    if (name.includes("그 외")) return setShowKakaoChatModal(true);
    setRegion(name);
    navigation(
      `/party/new/2?region=${name}&member=${member}&date=${date}&driverId=${driverId}`
    );
  }, [name, member, date, driverId]);

  return (
    <div className="relative h-64 cursor-pointer" onClick={clickHandler}>
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white z-10">
        {name}
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-lg" />
    </div>
  );
}

export default memo(RegionButton);
