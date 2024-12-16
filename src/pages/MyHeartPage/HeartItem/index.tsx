import { memo, MouseEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUnLikeParty, postLikeParty } from "../../../api/party";
import {
  deleteUnLikeDestination,
  postLikeDestination,
} from "../../../api/destination";
import star from "../../../assets/svg/star.svg";
import FillHeart from "../../../assets/svg/FillHeart.svg";
import EmptyHeart from "../../../assets/svg/EmptyHeart.svg";

interface Props {
  partyId: number;
  destinationId: number | undefined;
  image: string | null;
  name: string;
  rate: number | undefined;
  views: number | undefined;
}

function HeartItem({
  partyId,
  destinationId,
  image,
  name,
  rate,
  views,
}: Props) {
  const navigate = useNavigate();
  const [heart, setHeart] = useState(true);

  const heartClickHandler = useCallback(
    async (e: MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      if (!destinationId) return;

      try {
        heart
          ? partyId
            ? await deleteUnLikeParty(partyId)
            : await deleteUnLikeDestination(destinationId)
          : partyId
            ? await postLikeParty(partyId)
            : await postLikeDestination(destinationId);

        setHeart(!heart);
      } catch (e) {
        console.log(e);
      }
    },
    [heart, partyId, destinationId]
  );

  const clickHandler = useCallback(() => {
    if (partyId) navigate(`/party/detail/${partyId}`);
    else navigate(`/destination/detail/${destinationId}`);
  }, [partyId, destinationId]);

  return (
    <div className="relative h-64 cursor-pointer" onClick={clickHandler}>
      {image ? (
        <img
          className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
          src={image}
          alt={name}
        />
      ) : null}
      <img
        className="absolute top-2 right-2 cursor-pointer z-10"
        src={heart ? FillHeart : EmptyHeart}
        onClick={heartClickHandler}
        alt="image"
      />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full rounded-lg text-white bg-black bg-opacity-50">
        <div className="text-xl">{name}</div>
        {rate !== undefined && (
          <div className="flex justify-center items-center gap-1.5 text-sm">
            <img src={star} alt="star" />
            <span>{rate ? rate.toFixed(1) : "0.0"}</span>
          </div>
        )}
      </div>
      {views && (
        <div className="w-full absolute bottom-0 left-0 flex justify-center text-white text-xs py-1 rounded-b-lg">
          {`${views}회 조회`}
        </div>
      )}
    </div>
  );
}

export default memo(HeartItem);
