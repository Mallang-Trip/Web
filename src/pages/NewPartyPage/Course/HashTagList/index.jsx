import HashTagItem from "./HashTagItem";

function HashTagList({ itemList }) {
  return (
    <div className="flex gap-2 my-2">
      {itemList.map((item) => (
        <HashTagItem name={item} key={item} />
      ))}
    </div>
  );
}

export default HashTagList;
