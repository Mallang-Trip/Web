import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import clsx from "clsx";

interface Props {
  region: string[];
  image: string;
  name: string;
  setRegion: Dispatch<SetStateAction<string[]>>;
}

function Region({ region, image, name, setRegion }: Props) {
  const isMyRegion = useMemo(() => region.includes(name), [region, name]);

  const clickHandler = useCallback(() => {
    if (isMyRegion) {
      const newRegions = region.filter((item) => item !== name);
      setRegion(newRegions);
    } else setRegion([...region, name]);
  }, [isMyRegion, region, name]);

  return (
    <div
      className={clsx(
        "relative h-40 md:h-56 cursor-pointer rounded-lg",
        isMyRegion && "ring ring-primary"
      )}
      onClick={clickHandler}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-xl text-white z-10">
        <div>{name}</div>
      </div>
      <div
        className={clsx(
          isMyRegion
            ? "absolute top-0 left-0 w-full h-full bg-primary rounded-lg opacity-50"
            : "absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-lg"
        )}
      />
    </div>
  );
}

export default memo(Region);
