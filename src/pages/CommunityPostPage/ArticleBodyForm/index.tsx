import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  memo,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { useParams } from "react-router-dom";

interface Props {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
}

function ArticleBodyForm({
  title,
  setTitle,
  content,
  setContent,
  submitHandler,
}: Props) {
  const { articleId } = useParams();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const titleHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, []);

  const contentHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = textareaRef.current;
      setContent(event.target.value);

      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    },
    [textareaRef]
  );

  return (
    <form className="mt-10" onSubmit={submitHandler}>
      <input
        type="text"
        value={title}
        onChange={titleHandler}
        placeholder="제목을 입력해주세요"
        className="w-full text-2xl text-black placeholder:text-darkgray focus:outline-none"
      />
      <hr className="bg-mediumgray mt-4 mb-8 h-px border-0" />
      <textarea
        ref={textareaRef}
        value={content}
        onChange={contentHandler}
        placeholder="내용을 작성해주세요."
        className="w-full min-h-[320px] max-h-[320px] text-sm text-boldgray placeholder:text-darkgray focus:outline-none resize-none custom-scrollbar"
      />
      <div className="flex justify-center items-center mt-[70px]">
        <button
          type="submit"
          className="h-12 text-white rounded-full text-md w-64 md:w-80 bg-primary"
        >
          {articleId === "new" ? "등록하기" : "수정하기"}
        </button>
      </div>
    </form>
  );
}

export default memo(ArticleBodyForm);
