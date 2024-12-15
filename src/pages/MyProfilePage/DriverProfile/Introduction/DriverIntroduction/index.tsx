import { ChangeEvent, memo } from "react";
import clsx from "clsx";

interface Props {
  modifyMode: boolean;
  content: string;
  onChangeHandler: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function DriverIntroduction({ modifyMode, content, onChangeHandler }: Props) {
  return (
    <div
      className={clsx(
        "py-4 px-6 rounded-xl whitespace-nowrap text-sm relative",
        modifyMode ? "text-primary bg-skyblue" : "text-darkgray bg-lightgray"
      )}
    >
      <textarea
        className={clsx(
          "w-full h-28 focus:outline-none resize-none overflow-hidden",
          modifyMode && "bg-skyblue"
        )}
        placeholder="(선택 사항)자기소개를 300자 이내로 입력해주세요"
        value={content}
        onChange={onChangeHandler}
        disabled={!modifyMode}
      />
      {modifyMode && (
        <div className="absolute bottom-0 left-0 w-full px-6 pb-3 flex justify-end text-primary">
          {`${content.length}/300`}
        </div>
      )}
    </div>
  );
}

export default memo(DriverIntroduction);
