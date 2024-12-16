import clsx from "clsx";
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

interface Props {
  title: string;
  memberCount: number;
  setMemberCount: Dispatch<SetStateAction<number>>;
  selected: boolean;
}

function MemberButton({ title, memberCount, setMemberCount, selected }: Props) {
  const [name, setName] = useState("");

  const clickHandler = useCallback(() => {
    if (title === "본인") return;

    if (name === "+") setMemberCount(memberCount + 1);
    else setMemberCount(memberCount - 1);
  }, [name, title, memberCount]);

  useEffect(() => {
    if (title === "본인") selected && setName("본인");
    else selected ? setName(title) : setName("+");
  }, [selected]);

  return (
    <button
      className={clsx(
        "w-[87px] h-8 text-sm border rounded-full focus:outline-none",
        name === "+"
          ? "bg-white text-darkgray border-darkgray"
          : "bg-primary text-white border-primary",
        title === "본인" ? "cursor-default" : "cursor-pointer"
      )}
      onClick={clickHandler}
    >
      {name}
    </button>
  );
}

export default memo(MemberButton);
