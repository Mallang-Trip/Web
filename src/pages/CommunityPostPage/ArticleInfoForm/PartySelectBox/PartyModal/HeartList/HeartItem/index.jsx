import { useState } from "react";
import {
  deleteUnLikeDestination,
  postLikeDestination,
} from "../../../../../../../api/destination";
import star from "../../../../../../../assets/svg/star.svg";
import FillHeart from "../../../../../../../assets/svg/FillHeart.svg";
import EmptyHeart from "../../../../../../../assets/svg/EmptyHeart.svg";

function HeartItem({ destination, selectPartyHandler }) {
  const [heart, setHeart] = useState(destination.dibs);

  const heartClickHandler = async (e) => {
    e.stopPropagation();

    if (destination) {
      try {
        heart
          ? await deleteUnLikeDestination(destination.destinationId)
          : await postLikeDestination(destination.destinationId);
        setHeart(!heart);
      } catch (e) {
        console.log(e);
      }
    } else {
      setHeart(!heart);
    }
  };

  if (!destination) return null;
  else
    return (
      <div
        className="relative h-44 cursor-pointer"
        onClick={() => selectPartyHandler(destination.name)}
      >
        <img
          className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
          src={destination.image}
          alt="heart-image"
        />
        <img
          className="absolute top-2 right-2 cursor-pointer z-10"
          src={heart ? FillHeart : EmptyHeart}
          onClick={heartClickHandler}
        />
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full rounded-lg text-white bg-black bg-opacity-50">
          <div className="text-xl">{destination.name}</div>
          <div className="flex justify-center items-center gap-1.5 text-sm">
            <img src={star} alt="star" />
            <span>
              {destination.rate ? destination.rate.toFixed(1) : "0.0"}
            </span>
          </div>
        </div>
        <div className="w-full absolute bottom-0 left-0 flex justify-center text-white text-xs py-1 rounded-b-lg">
          {`${destination.views}회 방문`}
        </div>
      </div>
    );
}

export default HeartItem;
