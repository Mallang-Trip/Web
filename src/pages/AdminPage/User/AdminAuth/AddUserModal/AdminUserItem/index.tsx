import { memo } from "react";
import { UserType } from "..";

function AdminUserItem({ image, username, age, sex }: UserType) {
  return (
    <div className="flex w-full mb-3">
      <div className="flex flex-1 items-center p-3 mr-3 border rounded-xl">
        <img
          className="rounded-full w-10 h-10 border mr-3"
          alt={username}
          src={image}
        />
        <div className="flex flex-col text-xs font-semibold">
          {username}
          <div className="flex flex-row text-darkgray font-normal mt-1">
            {age}대 | {sex === "male" ? "남" : "여"}
          </div>
        </div>
      </div>
      <button className="w-24 rounded-xl border font-bold text-darkgray">
        삭제
      </button>
    </div>
  );
}
export default memo(AdminUserItem);
