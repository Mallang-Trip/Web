import EditButton from "../../../components/EditButton";

function Title() {
  return (
    <div className="flex justify-between">
      <p className="text-2xl text-black font-bold">커뮤니티</p>
      <EditButton onClick={() => console.log("글쓰기")} title={"글쓰기"} />
    </div>
  );
}

export default Title;
