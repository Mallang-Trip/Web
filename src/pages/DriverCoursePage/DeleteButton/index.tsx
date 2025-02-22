import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "@/api/course";
import { CheckModal } from "@/components";

interface Props {
  courseId: string;
}

function DeleteButton({ courseId }: Props) {
  const navigation = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteHandler = useCallback(async () => {
    try {
      await deleteCourse(courseId);
      alert("일정 코스가 삭제되었습니다.");
      navigation("/my/profile", { replace: true });
    } catch (e) {
      console.log(e);
      alert("일정 코스 삭제에 실패했습니다.");
    }
  }, [courseId]);

  if (courseId === "new") return null;
  return (
    <>
      <div className="flex justify-center mt-20 md:mt-5">
        <button
          className="h-14 text-darkgray rounded-full text-lg font-bold w-80 bg-white border border-darkgray"
          onClick={() => setShowDeleteModal(true)}
        >
          일정 코스 삭제하기
        </button>
      </div>
      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message="일정 코스를 삭제하시겠습니까?"
        noText="취소"
        yesText="확인"
        yesHandler={() => {
          setShowDeleteModal(false);
          deleteHandler();
        }}
      />
    </>
  );
}

export default memo(DeleteButton);
