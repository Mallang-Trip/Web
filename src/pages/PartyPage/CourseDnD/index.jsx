import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { dateToStringHan } from "../../../utils";
import dragIcon from "../../../assets/svg/dragIcon.svg";
import deleteIcon from "../../../assets/svg/x-modal-icon.svg";
import ConfirmModal from "../../../components/ConfirmModal";

function CourseDnD({
  name,
  course,
  startDate,
  hours,
  courseData,
  setCourseData,
  nameChange = false,
  newName,
  setNewName,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleChange = (result) => {
    if (!result.destination) return;
    const items = [...courseData];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCourseData(items);
  };

  const deleteHandler = (destinationId) => {
    if (courseData.length === 2) return setShowModal(true);

    setCourseData(
      courseData.filter((item) => item.destinationId !== destinationId)
    );
  };

  useEffect(() => setCourseData(course.days[0].destinations), []);

  return (
    <>
      <div className="mt-20 font-bold flex flex-col items-center gap-6">
        {nameChange ? (
          <input
            type="text"
            className="w-full text-boldblue text-2xl text-center focus:outline-none placeholder:text-darkgray"
            placeholder="파티명을 입력해주세요"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
          <div className="text-boldblue text-2xl">{name}</div>
        )}
        <div className="text-primary text-lg">
          {`${dateToStringHan(startDate)} (${hours}시간)`}
        </div>
      </div>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="courselists">
          {(provided) => (
            <div
              className="courselists bg-skyblue w-full md:w-[900px] my-6 mx-auto border border-primary"
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
                        className={`bg-white w-4/5 md:w-[700px] h-[83px] mx-auto text-boldblue text-lg md:text-xl text-bold flex items-center ${
                          snapshot.isDragging && "border-2 border-primary"
                        }`}
                      >
                        <img
                          src={dragIcon}
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
                        <button
                          className="mx-3 rounded hover:bg-gray-200"
                          onClick={() => deleteHandler(item.destinationId)}
                        >
                          <img src={deleteIcon} alt="delete" />
                        </button>
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

      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={
          "여행지를 더 이상 삭제할 수 없습니다.\n\n(여행지는 최소 2개 이상)"
        }
      />
    </>
  );
}

export default CourseDnD;
