import fillStarIcon from "../../../../assets/svg/rateFillStar.svg";
import emptyStarIcon from "../../../../assets/svg/emptyStar.svg";
import halfStarIcon from "../../../../assets/svg/halfStar.svg";
import { useState, useEffect } from "react";

interface Props {
  star: number;
  setStar: (star: number) => void;
}

function StarInput({ star, setStar }: Props) {
  const [starArray, setStarArray] = useState([0, 0, 0, 0, 0]);
  const [starHoverStar, setStarHoverStar] = useState(0);
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

  const starHandler = (index: number, isHalf: boolean, isHover: boolean) => {
    // if (isHover) {
    //   return setStarHoverStar(isHalf ? index + 0.5 : index + 1);
    // }
    setStar(isHalf ? index + 0.5 : index + 1);
  };

  const getStarIcon = (value: number) => {
    switch (value) {
      case 1:
        return <img src={fillStarIcon} />;
      case 0.5:
        return <img className={"w-full"} src={halfStarIcon} />;
      default:
        return <img src={emptyStarIcon} />;
    }
  };

  return (
    <fieldset className="flex h-full gap-1" onMouseLeave={() => setStar(0)}>
      {starArray.map((value, index) => (
        <div className={"relative overflow-hidden cursor-pointer"} key={index}>
          <div className={"relative w-fit h-fit z-10"}>
            <div className={"absolute flex w-full h-full"}>
              <div
                className={"w-full"}
                onClick={() => starHandler(index, true, false)}
                onMouseOver={() => starHandler(index, true, true)}
                onMouseLeave={() => console.log(index + "left gone")}
              />
              <div
                className={"w-full"}
                onClick={() => starHandler(index, false, false)}
                onMouseOver={() => starHandler(index, false, true)}
              />
            </div>
            {getStarIcon(value)}
          </div>
        </div>
      ))}
    </fieldset>
  );
}

export default StarInput;
