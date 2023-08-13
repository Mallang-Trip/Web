import React from "react";

function LeftBigPicture(props) {
  return (
    <img
      className="rounded-l-[40px] h-[300px]"
      src={props.src}
      name={props.name}
    />
  );
}

export default LeftBigPicture;
