import React from "react";
import HashTag from "../../../../components/HashTag";

function HashTagBox() {
  return (
    <div className="flex m-3 gap-[10px]">
      <HashTag title="#체험" />
      <HashTag title="#녹차" />
      <HashTag title="#힐링" />
      <HashTag title="#힐링" />
    </div>
  );
}

export default HashTagBox;
