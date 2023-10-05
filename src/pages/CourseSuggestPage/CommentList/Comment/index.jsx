import React from "react";
import profileImage from "../../../../assets/images/profileImage.png";
import Star from "../../../../assets/svg/star.svg";
import Info from "../../../../assets/svg/info.svg";

function Comment() {
  return (
    <div className="mt-7">
      <div className="flex items-center">
        <img className="w-10 h-10" src={profileImage} />
        <div className="text-sm ml-1.5 mr-1">콜로콜로피콜</div>
        <img src={Info} />
        <div className="ml-2.5 flex">
          <img className="mb-1 mr-1" src={Star} />
          <p className="text-sm">4.7</p>
        </div>
      </div>
      <div className="text-sm mt-2">
        {
          "박물관 엄청 크고 좋아요. 녹차 따기 체험이나 다과 체험 등 다양하게 있었는데 정말 만족합니다. 강추"
        }
      </div>
    </div>
  );
}

export default Comment;
