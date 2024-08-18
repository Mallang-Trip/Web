import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePartyRegion } from "../../../../../../api/region";

function RegionItem({
  regionId,
  image,
  name,
  province,
  setEditTarget,
  setShowEditModal,
  getPartyRegionListFunc,
  setShowDeleteErrorModal,
}) {
  const navigation = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const deleteHandler = async () => {
    try {
      const result = await deletePartyRegion(regionId);
      if (result.statusCode === 409) return setShowDeleteErrorModal(true);
      alert("성공적으로 지역을 삭제했습니다.");
      getPartyRegionListFunc();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="relative h-64 cursor-default"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      {!isHover ? (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white font-bold">
          {name}
        </div>
      ) : (
        <div className="absolute top-0 left-0 flex flex-col items-center justify-around w-full h-full rounded-lg bg-black/30">
          <p className="text-xl text-white font-bold">{name}</p>
          <button
            className="px-4 py-1 text-sm text-white bg-primary rounded-full"
            onClick={() =>
              navigation(
                `/admin/region?region_id=${regionId}&region_name=${name}`
              )
            }
          >
            드라이버 목록
          </button>
          <div className="flex justify-center gap-5 items-center">
            <button
              className="px-4 py-1 text-sm text-primary font-bold border-2 border-primary rounded-full"
              onClick={() => {
                setEditTarget({
                  partyRegionId: regionId,
                  region: name,
                  regionImg: image,
                  province: province,
                });
                setShowEditModal(true);
              }}
            >
              편집
            </button>
            <button
              className="px-4 py-1 text-sm text-[#ff0000] font-bold border-2 border-[#ff0000] rounded-full"
              onClick={deleteHandler}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegionItem;
