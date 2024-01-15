import TravelerInfo from "./TravelerInfo";
import TravelerTitle from "./TravelerTitle";
import TravelerInput from "./TravelerInput";

function TravelerBox({ memberCount }) {
  return (
    <div className="mb-6">
      <TravelerTitle />
      <TravelerInfo />
      {Array.apply(null, new Array(memberCount - 1)).map((_, index) => (
        <TravelerInput key={index} index={index} />
      ))}
    </div>
  );
}

export default TravelerBox;
