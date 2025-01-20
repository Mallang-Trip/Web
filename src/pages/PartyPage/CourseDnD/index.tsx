import {
  Dispatch,
  ForwardedRef,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { dateToStringHan } from "@/utils";
import { Course, Destination } from "@/types";
import { ConfirmModal } from "@/components";
import dragIcon from "@/assets/svg/dragIcon.svg";
import deleteIcon from "@/assets/svg/x-modal-icon.svg";
import TimeModal from "@/pages/DriverCoursePage/CourseDnD/TimeModal";
import clsx from "clsx";

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  course: Course;
  startDate: string;
  hours: number;
  courseData: Destination[];
  setCourseData: Dispatch<SetStateAction<Destination[]>>;
  startTime: string;
  endTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  shakeCourse?: boolean;
  courseRef?: ForwardedRef<HTMLDivElement>;
}

function CourseDnD({
  name,
  setName,
  course,
  startDate,
  hours,
  courseData,
  setCourseData,
  startTime,
  endTime,
  setStartTime,
  shakeCourse,
  courseRef,
}: Props) {
  const [showText, setShowText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const handleChange = useCallback(
    (result: any) => {
      if (!result.destination) return;
      const items = [...courseData];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setCourseData(items);
    },
    [courseData]
  );

  const deleteHandler = useCallback(
    (targetIndex: number) => {
      if (courseData.length === 2) return setShowModal(true);
      setCourseData(courseData.filter((_, index) => index !== targetIndex));
    },
    [courseData]
  );

  useEffect(() => {
    if (courseData.length === 0) {
      setCourseData(course.days[0].destinations);
    }
  }, []);

  useEffect(() => {
    if (shakeCourse) setShowText(true);
  }, [shakeCourse]);

  return (
    <div ref={courseRef} className={clsx(shakeCourse && "animate-shake")}>
      <div className="mt-20 font-bold flex flex-col items-center gap-6">
        <input
          type="text"
          className="w-full text-boldblue text-2xl text-center focus:outline-none placeholder:text-darkgray"
          placeholder="일정명을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          className={clsx("text-sm", showText ? "text-red-600" : "text-white")}
        >
          {courseData.length === 0 && "여행지를 추가해주세요!"}
        </div>
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
                  draggableId={(item.destinationId * index).toString()}
                  index={index}
                  key={(item.destinationId * index).toString()}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={clsx(
                          "bg-white w-4/5 md:w-[700px] h-[83px] mx-auto text-boldblue text-lg md:text-xl text-bold flex items-center",
                          snapshot.isDragging && "border-2 border-primary"
                        )}
                      >
                        <img
                          src={dragIcon}
                          alt="drag"
                          className="ml-2.5 mr-5"
                        />
                        <div>{item.name}</div>
                        <div
                          className={clsx(
                            "ml-auto",
                            index === 0 && "cursor-pointer hover:font-bold"
                          )}
                          onClick={() => index === 0 && setShowTimeModal(true)}
                        >
                          {index === 0
                            ? startTime
                            : index === courseData.length - 1 && endTime}
                        </div>
                        <button
                          className="mx-3 rounded hover:bg-gray-200"
                          onClick={() => deleteHandler(index)}
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
      <TimeModal
        showModal={showTimeModal}
        setShowModal={setShowTimeModal}
        startTime={startTime}
        setStartTime={setStartTime}
      />
    </div>
  );
}

export default memo(CourseDnD);
