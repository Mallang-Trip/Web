function Body({
  userId,
  userNickname,
  loginId,
  suspensionDuration,
  createdAt,
  setProfileId,
  setShowProfileModal,
}) {
  return (
    <div className="w-full py-3 grid grid-cols-4 items-center text-center bg-white border border-gray300 rounded-xl">
      <p className="px-1 text-gray700 font-medium">{userNickname}</p>
      <p className="px-1 text-gray700 font-medium">
        <span>{loginId}</span>
        {suspensionDuration !== 0 && (
          <span className="pl-2 ml-2 border-l border-gray500 text-[#ff0000] font-bold">
            {suspensionDuration === -1 ? "영구" : suspensionDuration + "일"}
          </span>
        )}
      </p>
      <p className="px-1 text-gray500 font-medium">
        {createdAt.slice(0, 10).replaceAll("-", ".")}
      </p>
      <button
        className="px-1 text-gray500 font-medium hover:font-semibold"
        onClick={() => {
          setProfileId(userId);
          setShowProfileModal(true);
        }}
      >
        프로필
      </button>
    </div>
  );
}

export default Body;
