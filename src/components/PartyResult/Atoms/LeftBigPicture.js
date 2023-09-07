import React from "react";

function LeftBigPicture(props) {
  return (
    <img
      className="object-cover rounded-l-[40px]"
      src={props.src}
      name={props.name}
    />
  );
}

export default LeftBigPicture;
