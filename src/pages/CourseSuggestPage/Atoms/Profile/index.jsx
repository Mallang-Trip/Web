import React from "react";
import info from "../../../../assets/svg/Group 172.svg";
import star from "../../../../assets/svg/star.svg";

function Profile() {
  return (
    <div>
      <div className="flex">
        <div className="w-10 h-10 rounded-full bg-gray" />
        <div className="text-[14px] mt-3 ml-1.5">콜로콜로피콜</div>
        <img className="ml-1.5 mt-1 " src={info} />
        <div className="mt-3 ml-4 grid grid-cols-2">
          <img className="m-1" src={star} />
          <p>4.7</p>
        </div>
      </div>
      <div className="text-[14px] mt-2">
        박물관 엄청 크고 좋아요. 녹차 따기 체험이나 다과 체험 등 다양하게
        있었는데 정말 만족합니다. 강추
      </div>
    </div>
  );
}

export default Profile;
