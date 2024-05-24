import AdminAuthItem from "./AdminAuthItem";

function TableBody({ adminUserData, setShowProfileModal, setProfileInfo }) {
  if (adminUserData.length === 0)
    return <div className="mt-20 text-center">목록이 비어있습니다.</div>;
  return (
    <div>
      {adminUserData.map((item) => (
        <AdminAuthItem
          key={item.userId}
          // setProfileInfo={setProfileInfo}
          // setShowProfileModal={setShowProfileModal}
          {...item}
        />
      ))}
    </div>
  );
}

export default TableBody;
