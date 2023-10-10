import jeju from "../../assets/images/제주도 이미지 3.jpg";

function PartyImageBox() {
  return (
    <div className="grid grid-cols-2 mt-2">
      <img className="object-cover rounded-l-3xl" src={jeju} alt={"제주도"} />
      <div className="grid grid-cols-2">
        <img className="object-cover" src={jeju} alt={"제주도"} />
        <img
          className="rounded-tr-3xl object-cover"
          src={jeju}
          alt={"제주도"}
        />
        <img className="object-cover" src={jeju} alt={"제주도"} />
        <img
          className="rounded-br-3xl object-cover"
          src={jeju}
          alt={"제주도"}
        />
      </div>
    </div>
  );
}

export default PartyImageBox;
