import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { customRoundOne } from "../../../../utils";
import { HeartParty } from "../../../../types";
import basicPartyImage from "../../../../assets/images/Basic_Party_Image.jpg";

function PartyBox({
  partyId,
  image,
  name,
  startDate,
  headcount,
  capacity,
  price,
}: HeartParty) {
  const navigate = useNavigate();

  const onClickHandler = useCallback(() => {
    navigate(`/party/detail/${partyId}`);
  }, [partyId]);

  return (
    <div className="relative h-64 cursor-pointer" onClick={onClickHandler}>
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image || basicPartyImage}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white z-10 px-5 text-center">
        {name}
      </div>
      <div className="w-full absolute bottom-0 left-0 flex justify-center text-white py-1 rounded-b-lg z-10">
        {`${startDate
          .slice(5)
          .replace("-", "/")} | ${headcount}/${capacity}명 | ${customRoundOne(
          price / 10000
        )}만원`}
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-lg" />
    </div>
  );
}

export default memo(PartyBox);
