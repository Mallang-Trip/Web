import { memo } from "react";
import { useNavigate } from "react-router-dom";
import EditButton from "../../../components/EditButton";

function Title() {
  const navigation = useNavigate();

  return (
    <div className="flex justify-between">
      <p className="text-2xl text-black font-bold">커뮤니티</p>
      <EditButton
        onClick={() => navigation("/community/post/new")}
        title="글쓰기"
      />
    </div>
  );
}

export default memo(Title);
