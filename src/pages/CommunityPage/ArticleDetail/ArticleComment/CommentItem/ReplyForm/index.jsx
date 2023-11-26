import { useState } from "react";
import { useSelector } from "react-redux";
import profileImage from "../../../../../../assets/images/profileImage.png";

function ReplyForm() {
  const user = useSelector((state) => state.user);
  const [newApply, setNewApply] = useState("");

  const applySubmitHandler = (e) => {
    e.preventDefault();

    console.log(newApply);
  };

  return (
    <form
      className="flex justify-between items-center gap-3 py-5"
      onSubmit={applySubmitHandler}
    >
      <img
        src={user.profileImg || profileImage}
        alt="profile_image"
        className="w-11 h-11 rounded-full"
      />
      <input
        type="text"
        value={newApply}
        onChange={(e) => setNewApply(e.target.value)}
        className="w-full focus:outline-none bg-[#F4F4F4] py-2.5 px-5 text-base rounded-lg"
        placeholder="답글을 입력해주세요."
      />
      <button
        type="submit"
        className="w-20 py-3 bg-[#EAF4FF] text-sm text-primary rounded-lg border border-primary"
      >
        등록
      </button>
    </form>
  );
}

export default ReplyForm;
