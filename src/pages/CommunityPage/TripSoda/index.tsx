import { memo } from "react";
import { Link } from "react-router-dom";
import MallangSoda from "@/assets/svg/Mallang-Soda.svg";
import TravelCommunity from "@/assets/images/Travel-Community.png";

function TripSoda() {
  return (
    <Link
      to="https://tripsoda.com/"
      target="_blank"
      className="w-full bg-[#E9FFF6] rounded-xl px-5 md:px-10 flex justify-between items-center my-4"
    >
      <div className="py-6 flex flex-col gap-2 md:gap-3">
        <img src={MallangSoda} className="w-32 md:w-40" alt="트립소다" />
        <div>
          <p className="text-sm md:text-base leading-5 md:leading-6 font-bold text-[#333333]">
            여행 동행자를 찾고 있나요?
          </p>
          <p className="text-xs md:text-base leading-5 md:leading-6 font-normal text-[#333333]">
            트립소다에서 함께 할 사람을 찾아보세요! 🚀
          </p>
        </div>
      </div>
      <img
        src={TravelCommunity}
        className="w-16 md:w-[108px] mr-0 md:mr-5"
        alt="트립소다"
      />
    </Link>
  );
}

export default memo(TripSoda);
