import { useRef } from "react";
import { useParams } from "react-router-dom";

function ArticleBodyForm({
  title,
  setTitle,
  content,
  setContent,
  submitHandler,
}) {
  const { id } = useParams();
  const textareaRef = useRef();

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    const textarea = textareaRef.current;
    setContent(e.target.value);

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <form className="mt-10" onSubmit={submitHandler}>
      <input
        type="text"
        value={title}
        onChange={titleHandler}
        placeholder="제목을 입력해주세요"
        className="w-full text-2xl text-black placeholder:text-darkgray focus:outline-none"
      />
      <hr className="bg-[#D9D9D9] mt-4 mb-8 h-px border-0" />
      <textarea
        ref={textareaRef}
        value={content}
        onChange={contentHandler}
        placeholder="내용을 작성해주세요."
        className="w-full min-h-[320px] text-sm text-[#3E3E3E] placeholder:text-darkgray focus:outline-none resize-none noScrollBar"
      />
      <div className="flex justify-center items-center mt-[70px]">
        <button
          type="submit"
          className="h-12 text-white rounded-full text-md w-64 md:w-80 bg-primary"
        >
          {id === "new" ? "등록하기" : "수정하기"}
        </button>
      </div>
    </form>
  );
}

export default ArticleBodyForm;
