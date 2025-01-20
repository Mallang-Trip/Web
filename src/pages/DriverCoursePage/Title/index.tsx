import { memo } from "react";

interface Props {
  courseId: string;
}

function Title({ courseId }: Props) {
  return (
    <div className="mb-8 text-2xl text-black font-bold">
      {courseId === "new" ? "새로운 일정 코스 추가하기" : "일정 코스 수정하기"}
    </div>
  );
}

export default memo(Title);
