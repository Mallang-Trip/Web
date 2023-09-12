import React from "react";
import { ReactComponent as Talk } from "../../assets/svg/bottom-talk.svg";
import { ReactComponent as Community } from "../../assets/svg/bottom-community.svg";
import { ReactComponent as Home } from "../../assets/svg/bottom-home.svg";
import { ReactComponent as Heart } from "../../assets/svg/bottom-heart.svg";

function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 hover:bg-gray-50 group"
        >
          <Talk className="w-7 h-7 mb-1 group-hover:text-primary" />
          <span className="text-sm text-gray-500 group-hover:text-primary">
            말랑톡
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 hover:bg-gray-50 group"
        >
          <Community className="w-7 h-7 mb-1 group-hover:text-primary" />
          <span className="text-sm text-gray-500 group-hover:text-primary">
            커뮤니티
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 hover:bg-gray-50 group"
        >
          <Home className="w-7 h-7 mb-1 group-hover:text-primary" />
          <span className="text-sm text-gray-500 group-hover:text-primary">
            홈
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 hover:bg-gray-50 group"
        >
          <Heart className="w-7 h-7 mb-1 group-hover:text-primary" />
          <span className="text-sm text-gray-500 group-hover:text-primary">
            찜
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 hover:bg-gray-50 group"
        >
          <img
            className="w-9 h-9 rounded-full"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User_Profile_Image"
          />
        </button>
      </div>
    </div>
  );
}

export default BottomNav;
