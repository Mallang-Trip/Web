import React from "react";

function SuggestButton() {
  return (
    <div className="flex justify-center my-20">
      <button
        className="mx-auto h-12 text-white rounded-full text-lg w-64 md:w-80 bg-primary"
        onClick={() => console.log("제안 보내기")}
      >
        제안 보내기
      </button>
    </div>
  );
}

export default SuggestButton;