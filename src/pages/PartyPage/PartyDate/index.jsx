import { dateToStringHan } from "../../../utils";

function PartyDate({ startDate }) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">날짜</p>
      <p className="text-sm text-darkgray font-medium">{`${dateToStringHan(
        startDate
      )}`}</p>
    </div>
  );
}

export default PartyDate;
