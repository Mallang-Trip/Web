import { useState } from "react";
import { useSelector } from "react-redux";
import { postNewReply } from "../../../../../../api/article";
import basicProfileImage from "../../../../../../assets/images/profileImage.png";

function ReplyForm({ commentId, reloadArticle }) {
  const user = useSelector((state) => state.user);
  const [newReply, setNewReply] = useState("");

  const applySubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await postNewReply(commentId, newReply);
      setNewReply("");
      reloadArticle();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className="flex justify-between items-center gap-3 py-5"
      onSubmit={applySubmitHandler}
    >
      <img
        src={user.profileImg || basicProfileImage}
        alt="profile_image"
        className="w-11 h-11 rounded-full"
      />
      <input
        type="text"
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        className="w-full focus:outline-primary bg-lightgray py-2.5 px-5 text-base rounded-lg"
        placeholder="답글을 입력해주세요."
      />
      <button
        type="submit"
        className="w-20 py-3 bg-skyblue text-sm text-primary rounded-lg border border-primary"
      >
        등록
      </button>
    </form>
  );
}

export default ReplyForm;
