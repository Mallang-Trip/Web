import { dateToStringHan } from "../../../../utils";

function Period({ startDate, endDate }) {
  return (
    <div className="pb-6">
      <p className="text-lg font-bold">기간</p>
      <p className="text-sm text-darkgray">{`${dateToStringHan(
        startDate
      )} ~ ${dateToStringHan(endDate)}`}</p>
    </div>
  );
}

export default Period;
