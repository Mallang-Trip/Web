import deleteMemberIcon from "../../../../../../../../assets/svg/invite-member-x.svg";

function Member({ inviteMember, setInviteMember, userId, nickName }) {
  const deleteHandler = () => {
    setInviteMember(inviteMember.filter((member) => member.userId !== userId));
  };

  return (
    <div className="flex gap-2 items-center bg-skyblue text-primary text-xs font-medium px-2.5 py-2 rounded">
      <span>{nickName}</span>
      <button onClick={deleteHandler}>
        <img src={deleteMemberIcon} alt="취소" />
      </button>
    </div>
  );
}

export default Member;
