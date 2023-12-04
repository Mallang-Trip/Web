import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postNewComment } from "../../../../../api/article";
import profileImage from "../../../../../assets/images/profileImage.png";

function CommentForm({ reloadArticle }) {
  const user = useSelector((state) => state.user);
  const { articleId } = useParams();
  const [newComment, setNewComment] = useState("");

  const commentSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await postNewComment(articleId, newComment);

      setNewComment("");
      reloadArticle();

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className="flex justify-between items-center gap-3 mt-9 mb-4"
      onSubmit={commentSubmitHandler}
    >
      <img
        src={user.profileImg || profileImage}
        alt="profile_image"
        className="w-11 h-11 rounded-full"
      />
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full focus:outline-none bg-[#F4F4F4] py-2.5 px-5 text-base rounded-lg"
        placeholder="댓글을 입력해주세요."
      />
      <button
        type="submit"
        className="w-20 py-3 bg-primary text-sm text-white rounded-lg"
      >
        등록
      </button>
    </form>
  );
}

export default CommentForm;
