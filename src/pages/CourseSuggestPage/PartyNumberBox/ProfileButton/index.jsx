import React from "react";

function ProfileButton({ title }) {
  return (
    <button
      className={`w-[87px] h-[30px] text-sm border border-current rounded-full hover:bg-primary hover:text-white`}
      onClick={() => console.log(title)}
    >
      {title}
    </button>
  );
}

export default ProfileButton;
