import React from "react";

function HashTag(props) {
  return (
    <div>
      <button className="rounded-full w-[74px] h-[30px] border border-primary pl-4 pr-4 pt-0.5 pb-0.5 text-sm text-primary">
        {props.title}
      </button>
    </div>
  );
}

export default HashTag;
