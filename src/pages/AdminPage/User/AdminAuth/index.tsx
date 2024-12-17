import { memo, useState } from "react";
import { Title, ConfirmModal } from "@/components";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import AddUserModal from "./AddUserModal";

function AdminAuth() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <div className="w-full text-base text-black font-medium">
      <Title title="관리자 권한 부여" />
      <div className="flex justify-end w-full">
        <button
          className="w-fit px-4 py-3 my-3 rounded-lg bg-primary text-white text-sm font-semibold"
          onClick={() => setShowAddModal(true)}
        >
          관리자 추가
        </button>
      </div>
      <div>
        <TableHead />
        <TableBody adminUserData={[]} />
      </div>
      <AddUserModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        titleMessage="닉네임 검색을 통해 관리자를 등록해주세요."
        placeholder="닉네임 검색"
        userList={[]}
        noText="취소"
        yesText="등록"
        yesHandler={() => {
          setShowConfirmModal(true);
        }}
      />
      <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        message={"[개발 X]\n\n관리자로 성공적으로 추가되었습니다."}
      />
    </div>
  );
}

export default memo(AdminAuth);
