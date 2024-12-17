import { FormEvent, memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postNewComment } from "@/api/article";
import { RootState } from "@/redux/store";
import basicProfileImage from "@/assets/images/profileImage.png";

interface Props {
  getArticleDetailFunc: () => void;
}

function CommentForm({ getArticleDetailFunc }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const { articleId } = useParams();
  const [newComment, setNewComment] = useState("");

  const commentSubmitHandler = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!articleId) return;

      try {
        await postNewComment(articleId, newComment);
        setNewComment("");
        getArticleDetailFunc();
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      } catch (e) {
        console.log(e);
      }
    },
    [articleId, newComment]
  );

  if (!user.userId) return null;
  return (
    <form
      className="flex justify-between items-center gap-3 mt-9 mb-4"
      onSubmit={commentSubmitHandler}
    >
      <img
        src={user.profileImg || basicProfileImage}
        alt="profile_image"
        className="w-10 h-10 rounded-full"
      />
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full focus:outline-primary bg-lightgray py-2.5 px-5 text-sm rounded-lg"
        placeholder="댓글을 입력해주세요."
      />
      <button
        type="submit"
        className="w-20 py-2.5 bg-primary text-sm text-white rounded-lg"
      >
        등록
      </button>
    </form>
  );
}

export default memo(CommentForm);
