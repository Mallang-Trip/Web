const dateToString = (date) => {
  return `${date.slice(0, 4)}년 ${date.slice(5, 7)}월 ${date.slice(8, 10)}일`;
};

function Period({ startDate, endDate }) {
  return (
    <div className="pb-6">
      <p className="text-lg font-bold">기간</p>
      <p className="text-sm text-darkgray">{`${dateToString(
        startDate
      )} ~ ${dateToString(endDate)}`}</p>
    </div>
  );
}

export default Period;
