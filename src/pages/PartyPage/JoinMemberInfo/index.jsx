import MyInfo from "./MyInfo";
import FriendInfo from "./FriendInfo";

function JoinMemberInfo({ memberCount }) {
  return (
    <div className="my-7 flex flex-col gap-6">
      <p className="text-lg text-black font-bold">여행자 정보</p>
      <MyInfo />
      {Array.apply(null, new Array(memberCount - 1)).map((_, index) => (
        <FriendInfo key={index} index={index} />
      ))}
    </div>
  );
}

export default JoinMemberInfo;
