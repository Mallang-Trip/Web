import React from "react";

function LeftBigPicture({ src, name }) {
  return <img className="object-cover rounded-l-3xl" src={src} name={name} />;
}

export default LeftBigPicture;
