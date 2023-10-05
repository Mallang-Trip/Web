import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragIcon from "../../../assets/svg/dragIcon.svg";

function CourseDnD() {
  const [courseData, setCourseData] = useState([
    {
      id: "1",
      name: "집합:제주공항 1게이트",
      time: "10:00",
    },
    {
      id: "2",
      name: "9.81파크 제주",
      time: "11:00",
    },
    {
      id: "3",
      name: "녹색식당",
      time: "12:00",
    },
    {
      id: "4",
      name: "아르떼 뮤지엄",
      time: "13:30",
    },
    {
      id: "5",
      name: "어음분교 1963 카페",
      time: "15:00",
    },
    {
      id: "6",
      name: "수원봉 전망대",
      time: "16:00",
    },
    {
      id: "7",
      name: "제주돔베고기집",
      time: "17:00",
    },
    {
      id: "8",
      name: "해산: 각자 숙소까지 이동",
      time: "18:00",
    },
  ]);

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
        <div className="text-darkgray text-xl">2023.04.01 | 1일차</div>
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
                <Draggable draggableId={item.id} index={index} key={item.id}>
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
                        <div className="ml-auto">{item.time}</div>
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
