import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragIcon from "../../../assets/svg/dragIcon.svg";

function CourseDnD({ course, startDate, courseData, setCourseData }) {
  const handleChange = (result) => {
    if (!result.destination) return;
    const items = [...courseData];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCourseData(items);
  };

  return (
    <>
      <div className="mt-12 mb-6 font-bold flex flex-col items-center gap-10">
        <div className="text-boldblue text-2xl">파티명을 입력해주세요</div>
        <div className="text-darkgray text-xl">
          {startDate.replaceAll("-", ".")}
        </div>
      </div>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="courselists">
          {(provided) => (
            <div
              className="courselists bg-skyblue w-full md:w-[750px] mx-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {courseData.map((item, index) => (
                <Draggable
                  draggableId={item.destinationId.toString()}
                  index={index}
                  key={item.destinationId.toString()}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`bg-white w-4/5 md:w-[550px] h-[83px] mx-auto text-boldblue text-lg md:text-xl text-bold flex items-center pr-10 ${
                          snapshot.isDragging && "border-2 border-primary"
                        }`}
                      >
                        <img
                          src={DragIcon}
                          alt="drag"
                          className="ml-2.5 mr-5"
                        />
                        <div>{item.name}</div>
                        <div className="ml-auto">
                          {index === 0
                            ? course.days[0].startTime
                            : index === courseData.length - 1 &&
                              course.days[0].endTime}
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="mt-6 mb-5 flex justify-center">
        <button className="w-[120px] h-10 bg-primary rounded-full text-sm text-white">
          장소 추가
        </button>
      </div>
    </>
  );
}

export default CourseDnD;
