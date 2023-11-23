import primaryPlus from "../../../../../assets/svg/primary_plus.svg";

function NewCourse() {
  return (
    <div
      className="h-64 bg-[#EAF4FF] border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
      onClick={() => console.log("new_course")}
    >
      <img src={primaryPlus} alt="plus" className="w-6 h-6" />
    </div>
  );
}

export default NewCourse;
