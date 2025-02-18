import {
  useState,
  useEffect,
  memo,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import fillStarIcon from "@/assets/svg/rateFillStar.svg";
import emptyStarIcon from "@/assets/svg/emptyStar.svg";
import halfStarIcon from "@/assets/svg/halfStar.svg";

interface Props {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
}

function StarInput({ star, setStar }: Props) {
  const [starArray, setStarArray] = useState([0, 0, 0, 0, 0]);

  const starHandler = useCallback(
    (index: number, isHalf: boolean) => {
      setStar(isHalf ? index + 0.5 : index + 1);
    },
    [setStar]
  );

  const getStarIcon = useCallback(
    (value: number) => {
      switch (value) {
        case 1:
          return <img src={fillStarIcon} />;
        case 0.5:
          return <img className="w-full" src={halfStarIcon} />;
        default:
          return <img src={emptyStarIcon} />;
      }
    },
    [fillStarIcon, halfStarIcon, emptyStarIcon]
  );

  useEffect(() => {
    const filled = Math.floor(star);
    const newStarArray = [0, 0, 0, 0, 0];

    for (let i = 0; i < filled; i++) {
      newStarArray[i] = 1;
    }

    if (!Number.isInteger(star) && filled < starArray.length) {
      newStarArray[filled] = 0.5;
    }

    setStarArray(newStarArray);
  }, [star, starArray.length]);

  return (
    <fieldset className="flex h-full gap-1">
      {starArray.map((value, index) => (
        <div className="relative overflow-hidden cursor-pointer" key={index}>
          <div className="relative w-fit h-fit z-10">
            <div className="absolute flex w-full h-full">
              <div
                className="w-full"
                onClick={() => starHandler(index, true)}
              />
              <div
                className="w-full"
                onClick={() => starHandler(index, false)}
              />
            </div>
            {getStarIcon(value)}
          </div>
        </div>
      ))}
    </fieldset>
  );
}

export default memo(StarInput);
