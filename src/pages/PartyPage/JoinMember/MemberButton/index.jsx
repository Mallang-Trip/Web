import { useEffect, useState } from "react";

function MemberButton({ title, memberCount, setMemberCount, selected }) {
  const [name, setName] = useState("");

  const clickHandler = () => {
    if (title === "본인") return;

    if (name === "+") setMemberCount(memberCount + 1);
    else setMemberCount(memberCount - 1);
  };

  useEffect(() => {
    if (title === "본인") selected && setName("본인");
    else selected ? setName(title) : setName("+");
  }, [selected]);

  return (
    <button
      className={`w-[87px] h-8 text-sm border border-current rounded-full hover:bg-primary hover:text-white ${
        name === "+" ? "bg-white" : "bg-primary text-white"
      } ${title === "본인" ? "cursor-default" : "cursor-pointer"}`}
      onClick={clickHandler}
    >
      {name}
    </button>
  );
}

export default MemberButton;
