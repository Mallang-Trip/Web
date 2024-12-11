import { memo, MouseEvent, useCallback, useState } from "react";
import {
  deleteUnLikeParty,
  postLikeParty,
} from "../../../../../../../api/party";
import { customRoundOne } from "../../../../../../../utils";
import { HeartParty } from "../../../../../../../types";
import FillHeart from "../../../../../../../assets/svg/FillHeart.svg";
import EmptyHeart from "../../../../../../../assets/svg/EmptyHeart.svg";

interface Props extends HeartParty {
  selectPartyHandler: (party: { name: string; partyId: number }) => void;
}

function HeartItem({
  partyId,
  image,
  name,
  startDate,
  headcount,
  capacity,
  price,
  selectPartyHandler,
}: Props) {
  const [heart, setHeart] = useState(true);

  const heartClickHandler = useCallback(
    async (event: MouseEvent) => {
      event.stopPropagation();

      try {
        heart ? await deleteUnLikeParty(partyId) : await postLikeParty(partyId);
        setHeart(!heart);
      } catch (e) {
        console.log(e);
      }
    },
    [heart, partyId]
  );

  return (
    <div
      className="relative h-44 cursor-pointer"
      onClick={() =>
        selectPartyHandler({
          name: name,
          partyId: partyId,
        })
      }
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      <img
        className="absolute top-2 right-2 cursor-pointer z-10"
        src={heart ? FillHeart : EmptyHeart}
        onClick={heartClickHandler}
      />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full rounded-lg text-lg text-white bg-black bg-opacity-50">
        {name}
      </div>
      <div className="w-full absolute bottom-0 left-0 flex justify-center text-white text-xs py-1 rounded-b-lg">
        {`${startDate
          .slice(5)
          .replace("-", "/")} | ${headcount}/${capacity}명 | ${customRoundOne(
          price / 10000
        )}만원`}
      </div>
    </div>
  );
}

export default memo(HeartItem);
