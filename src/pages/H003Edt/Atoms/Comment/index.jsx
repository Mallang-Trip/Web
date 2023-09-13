import Down from "../../../../assets/svg/Polygon 3.svg";

function Comment() {
  return (
    <div className="flex pb-7">
      <div className="text-[18px] font-bold">댓글</div>
      <div className="text-[14px] mt-1 ml-1.5 ">17</div>
      <img className="m-1" src={Down} />
    </div>
  );
}

export default Comment;
