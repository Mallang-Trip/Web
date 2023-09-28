import React from "react";

function RightPicture({ src, name }) {
  return (
    <div className="grid grid-cols-2">
      <img className="object-cover" src={src} name={name} alt="picture" />
      <img className="rounded-tr-3xl object-cover" src={src} name={name} />
      <img className="object-cover" src={src} name={name} />
      <img className="rounded-br-3xl object-cover" src={src} name={name} />
    </div>
  );
}

export default RightPicture;
