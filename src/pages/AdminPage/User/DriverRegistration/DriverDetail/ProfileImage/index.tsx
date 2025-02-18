import { memo } from "react";
import { CONSTANT } from "@/utils/data";

interface Props {
  name: string;
  profileImg?: string | undefined;
}

function ProfileImage({ name, profileImg }: Props) {
  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <img
        src={profileImg || CONSTANT.BASE_PROFILE_IMAGE}
        alt={name}
        className="w-[170px] h-[170px] rounded-full"
      />
      <div className="my-6 h-12 text-2xl md:text-3xl font-bold text-black text-center">
        {`${name} 드라이버`}
      </div>
    </div>
  );
}

export default memo(ProfileImage);
