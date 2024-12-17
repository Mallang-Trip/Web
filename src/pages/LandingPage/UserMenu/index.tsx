import { Dispatch, memo, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import clsx from "clsx";

interface Props {
  userMenu: "recommend" | "myParty";
  setUserMenu: Dispatch<SetStateAction<"recommend" | "myParty">>;
}

function UserMenu({ userMenu, setUserMenu }: Props) {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-col sm:flex-row justify-start gap-6">
      <button
        className={clsx(
          "text-2xl font-bold transition-all duration-500",
          userMenu === "recommend" ? "text-gray800" : "text-gray400"
        )}
        onClick={() => setUserMenu("recommend")}
        disabled={user.role !== "ROLE_USER"}
      >
        {user.auth ? `${user.nickname} 님께 추천하는 파티` : "추천 파티"}
      </button>
      {user.role === "ROLE_USER" && (
        <button
          className={clsx(
            "text-2xl font-bold transition-all duration-500",
            userMenu === "myParty" ? "text-gray800" : "text-gray400"
          )}
          onClick={() => setUserMenu("myParty")}
          disabled={user.role !== "ROLE_USER"}
        >
          나의 파티
        </button>
      )}
    </div>
  );
}

export default memo(UserMenu);
