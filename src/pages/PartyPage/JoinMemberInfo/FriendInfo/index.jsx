import { makePhoneNumber } from "../../../../utils";

function FriendInfo({ index, companions, setCompanions }) {
  const nameHandler = (e) => {
    const tempCompanions = [...companions];
    tempCompanions[index].name = e.target.value;
    setCompanions(tempCompanions);
  };

  const phoneNumberHandler = (e) => {
    const tempCompanions = [...companions];
    tempCompanions[index].phoneNumber = e.target.value;
    setCompanions(tempCompanions);
  };

  return (
    <div className="flex flex-col gap-2 text-sm text-darkgray font-medium">
      <p>{`여행자 ${index + 2}`}</p>
      <div className="w-full flex gap-2 whitespace-nowrap">
        <span>{"여행자 이름 : "}</span>
        <input
          type="text"
          className={`w-32 focus:outline-none text-primary placeholder:text-primary`}
          value={companions[index].name}
          onChange={nameHandler}
          placeholder="직접 입력해 주세요."
        />
      </div>
      <div className="w-full flex gap-2 whitespace-nowrap">
        <span>{"핸드폰 번호 : "}</span>
        <input
          type="text"
          className={`w-32 focus:outline-none text-primary placeholder:text-primary`}
          value={makePhoneNumber(companions[index].phoneNumber)}
          onChange={phoneNumberHandler}
          placeholder="직접 입력해 주세요."
        />
      </div>
    </div>
  );
}

export default FriendInfo;
