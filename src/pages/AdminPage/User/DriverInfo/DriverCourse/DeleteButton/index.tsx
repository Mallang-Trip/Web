import { memo, useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteDriverCourse } from "../../../../../../api/admin";
import CheckModal from "../../../../../../components/CheckModal";

function DeleteButton() {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const driverId = searchParams.get("driverId");
  const courseId = searchParams.get("courseId");

  const deleteHandler = useCallback(async () => {
    if (!driverId || !courseId) return;
    try {
      await deleteDriverCourse(driverId, courseId);
      alert("파티 코스가 삭제되었습니다.");
      navigation(`/admin/driver-info?driverId=${driverId}`, { replace: true });
    } catch (e) {
      console.log(e);
      alert("파티 코스 삭제에 실패했습니다.");
    }
  }, [driverId, courseId]);

  if (courseId === "new") return null;
  return (
    <>
      <div className="flex justify-center mt-20 md:mt-5">
        <button
          className="h-14 text-darkgray rounded-full text-lg font-bold w-80 bg-white border border-darkgray"
          onClick={() => setShowDeleteModal(true)}
        >
          파티 코스 삭제하기
        </button>
      </div>
      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message="파티 코스를 삭제하시겠습니까?"
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
