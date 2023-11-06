import star from "../../../../assets/svg/star.svg";

function PlaceInfoTitle({ name, views, avgRate, address }) {
  return (
    <div className="mb-4">
      <div className="mb-1 pt-6 flex">
        <p className="text-2xl font-bold">{name}</p>
        <div className="flex gap-1 m-2 mt-3 text-xs">
          <span>{`방문 ${views}회`}</span>
          <span>|</span>
          <img className="mb-1" src={star} />
          <span>{avgRate ? avgRate.toFixed(1) : "0.0"}</span>
        </div>
      </div>
      <div className="text-sm">{address}</div>
    </div>
  );
}

export default PlaceInfoTitle;
