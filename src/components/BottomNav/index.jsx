import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import profileImage from "../../assets/images/profileImage.png";
import { ReactComponent as Talk } from "../../assets/svg/bottom-talk.svg";
import { ReactComponent as Community } from "../../assets/svg/bottom-community.svg";
import { ReactComponent as Home } from "../../assets/svg/bottom-home.svg";
import { ReactComponent as Heart } from "../../assets/svg/bottom-heart.svg";

function BottomNav() {
  const navigation = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-[#D9D9D9] rounded-t-2xl md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 hover:bg-gray-50 group"
        >
          <Talk className="w-6 h-4 mb-1 group-hover:text-primary" />
          <span className="text-xs text-[#B7BFC2] group-hover:text-primary">
            말랑톡
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 hover:bg-gray-50 group"
        >
          <Community className="w-6 h-4 mb-1 group-hover:text-primary" />
          <span className="text-xs text-[#B7BFC2] group-hover:text-primary">
            커뮤니티
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 hover:bg-gray-50 group"
        >
          <Home className="w-6 h-4 mb-1 group-hover:text-primary" />
          <span className="text-xs text-[#B7BFC2] group-hover:text-primary">
            홈
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 hover:bg-gray-50 group"
        >
          <Heart className="w-6 h-4 mb-1 group-hover:text-primary" />
          <span className="text-xs text-[#B7BFC2] group-hover:text-primary">
            찜
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 hover:bg-gray-50 group"
          onClick={() => navigation("/my/profile")}
        >
          <img
            className="w-9 h-9 rounded-full"
            src={user.profileImg || profileImage}
            alt="User_Profile_Image"
          />
        </button>
      </div>
    </div>
  );
}

export default BottomNav;
